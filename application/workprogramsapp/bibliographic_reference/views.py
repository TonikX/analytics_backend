import json
import re
from html import unescape

import requests as rq
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters, status, generics
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from workprogramsapp.bibliographic_reference.serializers import BibliographicReferenceDetailSerializer, \
    BibliographicReferenceListSerializer, BibliographicReferenceCreateWithWpSerializer
from workprogramsapp.models import BibliographicReference


@api_view(['GET'])
def SearchInEBSCO(request):
    """
    Эндпоинт для поиска источника в Электронно-Библиотечной Системе EBSCO
    :param request:
    :return: {sources: []}
    """

    # Получение токена аутентификации
    def get_auth_token(user_id, password):
        headers = {"Content-Type": "application/json", "Accept": "application/json"}
        data = {"UserId": user_id, "Password": password, "interfaceid": "edsapi"}
        url = f"https://eds-api.ebscohost.com/authservice/rest/uidauth"

        request = rq.post(url, headers=headers, data=json.dumps(data))
        return request.text

    # Получение токена сессии
    def get_session_token(profile_id, auth_token):
        headers = {"Content-Type": "application/json", "Accept": "application/json",
                   "x-authenticationToken": json.loads(auth_token)["AuthToken"]}
        url = f"https://eds-api.ebscohost.com/edsapi/rest/createsession?profile={profile_id}"

        request = rq.get(url, headers=headers)
        return request.text

    # Поиск ресурса по базе EBSCO
    def search(term, auth_token, session_token):
        headers = {"Content-Type": "application/json", "Accept": "application/json",
                   "x-authenticationToken": json.loads(auth_token)["AuthToken"],
                   "x-sessionToken": json.loads(session_token)["SessionToken"]}
        url = f"https://eds-api.ebscohost.com/edsapi/rest/search?query={term}&view=detailed&highlight=n"

        request = rq.get(url, headers=headers)
        return request.text

    # Обработка ЭБС Лань из Сводного Каталога ИТМО
    def extract_ref_from_lan(record_data):
        ab_list = []
        for item in record_data["Items"]:
            if item["Name"] == "Abstract":
                ab_list.append(item["Data"])
        for abstract in ab_list:
            if "Библиографичекское описание:" in abstract:
                # ref = abstract[29:]
                return abstract

    # Очистка библиографической ссылки от ненужных символов
    def clean_text(bib_ref):
        # clean_bib_ref = bib_ref
        # elements_to_delete = []
        # for elem in elements_to_delete:
        #     clean_bib_ref = clean_bib_ref.replace(elem, "")
        if bib_ref is not None:
            bib_ref = delete_html(unescape(bib_ref))
        return bib_ref

    # Удаление тегов
    def delete_html(text):
        return re.sub(r'<.*?>', '', text)

    # Поиск автора
    def search_author(record):
        item_list = []
        for item in record["Items"]:
            if item["Label"] == "Authors":
                item_list.append(item["Data"])
        items = ", ".join(item_list)

        # for item in item_list:
        #     items += item
        return items

    def extract_main_author(authors):
        # если запятая разделяет авторов, то взять первого автора
        try:
            return authors[:authors.index(',')]
        except Exception:
            return authors

    # Поиск названия
    def search_title(record):
        item_list = []
        for item in record["Items"]:
            if item["Label"] == "Title":
                item_list.append(item["Data"])

        items = ''

        for item in item_list:
            items += item
        return items

    # Поиск издательства
    def search_publishing(record):
        return ""

    def search_city(record):
        return ""

    def search_number_of_edition(record):
        return None

    def search_year(record):
        year = None
        try:
            year = \
                record["RecordInfo"]["BibRecord"]["BibRelationships"]["IsPartOfRelationships"][0]["BibEntity"]["Dates"][
                    0][
                    "Y"]
        except Exception as e:
            return year
        return year

    def search_type_of_text(record):
        for item in record["Items"]:
            if item["Label"] == "Publication Type":
                pub_type = item["Data"]
                if "eBook" in pub_type:
                    return "Электронные ресурсы"
                return "Печатный экземпляр"

    def search_an(record):
        return record["Header"]["An"]

    def make_object(record, auth_token, session_token):
        source = {
            "accession_number": search_an(record),
            "authors": search_author(record),
            "title": search_title(record),
            "publishing_company": "",
            "year": (search_year(record)),
            "number_of_edition": None,
            "pages": None,
            "format": search_type_of_text(record),
            "publication_type": "Учебные издания",
        }

        for key, val in source.items():
            source[key] = clean_text(val)
        source["main_author"] = extract_main_author(source["authors"])
        # source["bib_reference"] = make_bib_reference(source)
        source["bib_reference"], extra_data = get_bib_reference(record, auth_token, session_token)
        s = [int(s) for s in re.findall(r'-?\d+\.?\d*', extra_data["pages"])]
        try:
            source["pages"] = s[0]
        except IndexError:
            source["pages"] = None
        source["publishing_company"] = extra_data["pub_info"]
        return source

    def get_extra_data(items):
        source = {"authors": [],
                  "title": "",
                  "pub_info": "",
                  "url": "",
                  "pages": "",
                  "source": "",
                  "access": "– Текст : непосредственный "}
        for item in items:
            if item["Label"] == "Authors":
                source["authors"].append(item["Data"])
            if item["Label"] == "Title":
                source["title"] = item["Data"]
            if item["Label"] == "Publication Information":
                source["pub_info"] = item["Data"] + " "
            if item["Label"] == "Availability":
                source["url"] = "– URL:  " + item["Data"] + " "
            if item["Label"] == "Online Access":
                source["url"] = " – URL: " + item["Data"] + " "
            if item["Label"] == "Physical Description":
                source["pages"] = " – " + item["Data"] + " "
            if item["Label"] == "Source":
                source["source"] = "// " + item["Data"] + " "
        return source

    def generate_bib_ref(items):
        source = get_extra_data(items)

        # Приводим авторов в Порядок
        source["authors"] = ", ".join(source["authors"])
        source["main_author"] = extract_main_author(source["authors"]) + " "

        # Либо электронный ресурс либо издательство
        if source["pub_info"]:
            source["authors"] += " "
        if source["url"]:
            source["access"] = "– Текст : электронный "
        bib_ref = f"{source['main_author']}{source['title']} / {source['authors']} {source['pub_info']}" \
                  f"{source['pages']}{source['access']}{source['source']}{source['url']}"
        return bib_ref, source

    def get_bib_reference(record, auth_token, session_token):
        headers = {"Content-Type": "application/json", "Accept": "application/json",
                   "x-authenticationToken": json.loads(auth_token)["AuthToken"],
                   "x-sessionToken": json.loads(session_token)["SessionToken"]}

        db_id = record["Header"]["DbId"]
        an = record["Header"]["An"]
        url2 = f"https://eds-api.ebscohost.com/edsapi/rest/retrieve?dbid={db_id}&an={an}"
        request2 = rq.get(url2, headers=headers)
        s = json.loads(request2.text)
        response = []
        for item in s["Record"]["Items"]:
            data = {}
            if item["Label"] == "Online Access":
                splited = item["Data"].split(";")
                splited = [link for link in splited if "http" in link]

                data["Label"] = "Online Access"
                data["Data"] = splited[-1][:splited[-1].find("&quot")]

            else:
                for key, val in item.items():
                    data[key] = clean_text(val)
            response.append(data)
        return generate_bib_ref(response)

    def make_bib_reference(source):
        if source['format'] == "Электронные ресурсы":
            text_format = "электронный"
        else:
            text_format = "непосредственный"

        if source["year"] is None:
            year = ""
        else:
            year = f" : {source['year']}"

        return f"{source['main_author']}, {source['title']} / {source['authors']}" \
               f"{year}. — Текст : {text_format}."

    query = request.query_params["query"]

    userid = "|ocy(tb.e2k_c)~xf*pi"
    pwd = "C4bfek8Mo7.BpPpGuO-M"
    profile = "edsapi"

    auth_token = get_auth_token(userid, pwd)

    session_token = get_session_token(profile, auth_token)

    s = json.loads(search(query, auth_token, session_token))

    try:
        records = s["SearchResult"]["Data"]["Records"]
    except KeyError:
        return Response({"sources": []})

    sources = []

    for record in records:
        sources.append(make_object(record, auth_token, session_token))
    return Response({"sources": sources})


class BibliographicReferenceViewSet(viewsets.ModelViewSet):
    queryset = BibliographicReference.objects.all()
    serializer_class = BibliographicReferenceDetailSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    filterset_fields = ["authors", "title", "year"]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        try:
            reference = BibliographicReference.objects.get(accession_number=request.data["accession_number"])
            serializer = self.get_serializer(reference, many=False)
        except BibliographicReference.DoesNotExist:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_serializer_class(self):
        if self.action == 'list':
            return BibliographicReferenceListSerializer
        if self.action == 'create':
            return BibliographicReferenceDetailSerializer
        if self.action == 'update':
            return BibliographicReferenceDetailSerializer
        if self.action == 'retrieve':
            return BibliographicReferenceDetailSerializer
        return BibliographicReferenceDetailSerializer


class BibliographicReferenceCreateWithWpView(generics.CreateAPIView):
    """Example:
    [
        {
          "wp_id": 67,
          "accession_number": "strinffffg",
          "authors": "string",
          "main_author": "string",
          "publication_type": "string",
          "title": "string",
          "publishing_company": "string",
          "year": "string",
          "number_of_edition": 0,
          "pages": 0,
          "format": "string",
          "publishing_type": "string",
          "bib_reference": "string",
          "description": "string"
        },
        {
          "wp_id": 67,
          "accession_number": "striffffffffng",
          "authors": "string",
          "main_author": "string",
          "publication_type": "string",
          "title": "string",
          "publishing_company": "string",
          "year": "string",
          "number_of_edition": 0,
          "pages": 0,
          "format": "string",
          "publishing_type": "string",
          "bib_reference": "string",
          "description": "string"
        }
    ]
    """
    queryset = BibliographicReference.objects.all()
    serializer_class = BibliographicReferenceCreateWithWpSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
