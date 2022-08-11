import json
import re
from html import unescape

import requests as rq
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from workprogramsapp.bibliographic_reference.serializers import BibliographicReferenceDetailSerializer, \
    BibliographicReferenceListSerializer
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
        # print(request.text)
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

    def make_object(record):
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
        source["bib_reference"] = make_bib_reference(source)

        return source

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
        sources.append(make_object(record))
    return Response({"sources": sources})


class BibliographicReferenceViewSet(viewsets.ModelViewSet):
    queryset = BibliographicReference.objects.all()
    serializer_class = BibliographicReferenceDetailSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    filterset_fields = ["authors", "title", "year"]

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
