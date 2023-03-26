import datetime
from pprint import pprint

from django.db import transaction
from django.db.models import Count
# Сериализаторы
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg2 import openapi
from drf_yasg2.utils import swagger_auto_schema
from rest_framework import filters, mixins
from rest_framework import generics, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
import pandas as pd

# Сериализаторы
from rest_framework.viewsets import GenericViewSet

from workprogramsapp.educational_program.serializers import EducationalCreateProgramSerializer, \
    EducationalProgramSerializer, \
    GeneralCharacteristicsSerializer, DepartmentSerializer, EducationalProgramUpdateSerializer, \
    GeneralLaborFunctionsSerializer, KindsOfActivitySerializerForEd, EmployerSerializer, \
    WorkProgramCompetenceIndicatorSerializer, ObjectsOfActivitySerializer
from .competence_handler import competence_dict_generator
from .general_prof_competencies.models import IndicatorInGeneralProfCompetenceInGeneralCharacteristic, \
    GeneralProfCompetencesInGroupOfGeneralCharacteristic, GroupOfGeneralProfCompetencesInEducationalStandard
from .general_prof_competencies.serializers import GroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer, \
    GeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer
from .key_competences.models import IndicatorInKeyCompetenceInGeneralCharacteristic, \
    KeyCompetencesInGroupOfGeneralCharacteristic, GroupOfKeyCompetencesInEducationalStandard
from .key_competences.serializers import GroupOfKeyCompetencesInGeneralCharacteristicSerializer, \
    KeyCompetencesInGroupOfGeneralCharacteristicSerializer
from .over_professional_competencies.models import GroupOfOverProfCompetencesInEducationalStandard, \
    OverProfCompetencesInGroupOfGeneralCharacteristic, IndicatorInOverProfCompetenceInGeneralCharacteristic
from .over_professional_competencies.serializers import GroupOfOverProfCompetencesInGeneralCharacteristicSerializer, \
    OverProfCompetencesInGroupOfGeneralCharacteristicSerializer
from .pk_comptencies.models import GroupOfPkCompetencesInGeneralCharacteristic, \
    PkCompetencesInGroupOfGeneralCharacteristic, IndicatorInPkCompetenceInGeneralCharacteristic
from .pk_comptencies.serializers import GroupOfPkCompetencesInGeneralCharacteristicSerializer, \
    PkCompetencesInGroupOfGeneralCharacteristicSerializer
from .process_modules_for_matrix import recursion_module_matrix

from .serializers import ProfessionalStandardSerializer

from workprogramsapp.serializers import ImplementationAcademicPlanSerializer

# --Работа с образовательной программой
from workprogramsapp.models import EducationalProgram, GeneralCharacteristics, Department, Profession, WorkProgram, \
    ImplementationAcademicPlan, Competence, Indicator, WorkProgramInFieldOfStudy, Zun, GeneralizedLaborFunctions, \
    KindsOfActivity, EmployerRepresentative, DisciplineBlockModule, DisciplineBlock, \
    WorkProgramChangeInDisciplineBlockModule, ObjectsOfActivity, AcademicPlan
from workprogramsapp.models import ProfessionalStandard

# Права доступа
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly, IsEducationPlanDeveloper

# Блок реализации АПИ для КПУД интерфейсов
from ..notifications.emails.send_mail import mail_sender


class EducationalProgramListAPIView(generics.ListAPIView):
    serializer_class = EducationalProgramSerializer
    queryset = EducationalProgram.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ['qualification', 'year_of_recruitment', 'manager']
    # filterset_fields = ['qualification',
    #                     'implementation_of_academic_plan__academic_plan__educational_profile',
    #                     'implementation_of_academic_plan__field_of_study__title',
    #                     'implementation_of_academic_plan__field_of_study__number',
    #                     'implementation_of_academic_plan__academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__prerequisites__name',
    #                     'implementation_of_academic_plan__academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__outcomes__name',
    #                     ]
    permission_classes = [IsRpdDeveloperOrReadOnly]


class EducationalProgramCreateAPIView(generics.CreateAPIView):
    serializer_class = EducationalCreateProgramSerializer
    queryset = EducationalProgram.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def perform_create(self, serializer):
        # print ('id', serializer.data.get('id'))
        general_characteristic = GeneralCharacteristics()
        general_characteristic.save()
        ep = serializer.save()
        GeneralCharacteristics.objects.filter(id=general_characteristic.id).update(educational_program=ep.id)


class EducationalProgramDestroyView(generics.DestroyAPIView):
    queryset = EducationalProgram.objects.all()
    serializer_class = EducationalProgramSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class EducationalProgramUpdateView(generics.UpdateAPIView):
    queryset = EducationalProgram.objects.all()
    serializer_class = EducationalProgramUpdateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class EducationalProgramDetailsView(generics.RetrieveAPIView):
    queryset = EducationalProgram.objects.all()
    serializer_class = EducationalProgramSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class GeneralCharacteristicsDetailsWithEducationalProgramView(generics.RetrieveAPIView):
    queryset = GeneralCharacteristics.objects.all()
    serializer_class = GeneralCharacteristicsSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get(self, request, **kwargs):
        data = GeneralCharacteristics.objects.get(educational_program=self.kwargs['pk'])
        serializer = self.get_serializer(data)
        return Response(serializer.data)


class GeneralCharacteristicsListAPIView(generics.ListAPIView):
    serializer_class = GeneralCharacteristicsSerializer
    queryset = GeneralCharacteristics.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['educational_program__title',
                     'educational_program__year',
                     'educational_program__qualification',
                     'educational_program__title',
                     'educational_program__year',
                     'educational_program__field_of_study__title',
                     'educational_program__field_of_study__number',
                     ]
    permission_classes = [IsRpdDeveloperOrReadOnly]


class GeneralCharacteristicsCreateAPIView(generics.CreateAPIView):
    serializer_class = GeneralCharacteristicsSerializer
    queryset = GeneralCharacteristics.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]


class GeneralCharacteristicsDestroyView(generics.DestroyAPIView):
    queryset = GeneralCharacteristics.objects.all()
    serializer_class = GeneralCharacteristicsSerializer
    permission_classes = [IsEducationPlanDeveloper]


class GeneralCharacteristicsUpdateView(generics.UpdateAPIView):
    queryset = GeneralCharacteristics.objects.all()
    serializer_class = GeneralCharacteristicsSerializer
    permission_classes = [IsEducationPlanDeveloper]


class GeneralCharacteristicsDetailsView(generics.RetrieveAPIView):
    queryset = GeneralCharacteristics.objects.all()
    serializer_class = GeneralCharacteristicsSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = GeneralCharacteristicsSerializer(instance, context={'request': request})
        return Response(serializer.data)

class DepartmentListAPIView(generics.ListAPIView):
    serializer_class = DepartmentSerializer
    queryset = Department.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title']
    permission_classes = [IsRpdDeveloperOrReadOnly]


class DepartmentCreateAPIView(generics.CreateAPIView):
    serializer_class = DepartmentSerializer
    queryset = Department.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]


class DepartmentDestroyView(generics.DestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class DepartmentUpdateView(generics.UpdateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class DepartmentDetailsView(generics.RetrieveAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ProfessionalStandardSet(viewsets.ModelViewSet):
    queryset = ProfessionalStandard.objects.all()
    serializer_class = ProfessionalStandardSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    permission_classes = [IsRpdDeveloperOrReadOnly]
    filterset_fields = ['title', 'code_of_prof_area'
                        ]
    search_fields = ['title', 'code']


class GeneralizedLaborFunctionsSet(viewsets.ModelViewSet):
    """
    CRUD для обобщенных трудовых сущностей
    """
    queryset = GeneralizedLaborFunctions.objects.all()
    serializer_class = GeneralLaborFunctionsSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]
    search_fields = ['name', 'code']


class KindsOfActivitySet(viewsets.ModelViewSet):
    """
    CRUD для сфер деятельности
    """
    queryset = KindsOfActivity.objects.all()
    serializer_class = KindsOfActivitySerializerForEd
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]
    search_fields = ['name']


class ObjectsOfActivitySet(viewsets.ModelViewSet):
    """
    CRUD для сфер деятельности
    """
    queryset = ObjectsOfActivity.objects.all()
    serializer_class = ObjectsOfActivitySerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]


class EmployerSet(mixins.CreateModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   GenericViewSet):
    """
    CRUD представителей работодателей
    """
    queryset = EmployerRepresentative.objects.all()
    serializer_class = EmployerSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]


@api_view(['POST'])
@permission_classes((IsAdminUser,))
@transaction.atomic
def UploadCompetences(request):
    csv_path = "workprogramsapp/educational_program/competences.csv"
    # Генерируем словарь компетенций из CSV
    dict_of_competences = competence_dict_generator(csv_path)
    # pprint(dict_of_competences)
    for op in dict_of_competences:
        # Существует ли генеральная характеристика и таблица EducationalProgram или же ее надо создавать для УП
        # op_real_object = ImplementationAcademicPlan.objects.get(year=int(op_year), title=op_name)
        # print(op["id_op"])
        print(op["id_op"])
        try:
            general_characteristic = GeneralCharacteristics.objects.get(educational_program__in=op["id_op"])
        except GeneralCharacteristics.DoesNotExist:
            general_characteristic = GeneralCharacteristics.objects.create()
            general_characteristic.educational_program.add(*op["id_op"])
        # Объект характеристики есть, идем по списку компетенций
        for competence in op["competence_list"]:
            competence_to_add = None
            indicator_from_db = []
            competence_from_db = Competence.objects.filter(name__iexact=competence["competence_name"].lower())
            if competence_from_db:
                for db_competence in competence_from_db:
                    indicator_from_db = list(Indicator.objects.filter(competence=db_competence))
                    indicator_from_db_name_list = [ind.name.lower() for ind in indicator_from_db].sort()
                    indicators_add_list = [ind["indicator_name"].lower() for ind in
                                           competence["indicators_list"]].sort()
                    if indicator_from_db_name_list == indicators_add_list:
                        competence_to_add = db_competence
                        break

            if not competence_to_add:
                competence_to_add = Competence.objects.create(number=competence["id_competence"],
                                                              name=competence["competence_name"])
                for indicator in competence["indicators_list"]:
                    created_indicator = Indicator.objects.create(number=indicator["id_indicator"],
                                                                 name=indicator["indicator_name"],
                                                                 competence=competence_to_add)
                    # Будем ли мы привязывать индикаторы к РПД теперь?
                    """for wp in indicator["wp_list"]:
                        wp_in_fos = WorkProgramInFieldOfStudy.objects.filter(work_program_id=wp,
                                                                             work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study=op_real_object).distinct()
                        for fs in wp_in_fos:
                            Zun.objects.create(wp_in_fs=fs, indicator_in_zun=created_indicator)"""
                    indicator_from_db.append(created_indicator)

            # Элемент старого кода
            CompGroupModel = GroupOfPkCompetencesInGeneralCharacteristic
            CompGeneralModel = PkCompetencesInGroupOfGeneralCharacteristic
            CompIndicatorModel = IndicatorInPkCompetenceInGeneralCharacteristic

            # pprint(competence_to_add)
            # pprint(indicator_from_db)
            comp_group, created = CompGroupModel.objects.get_or_create(name=competence["competence_group"],
                                                                       general_characteristic=general_characteristic)
            comp_general = CompGeneralModel.objects.create(group_of_pk=comp_group, competence=competence_to_add)
            for indicator in indicator_from_db:
                CompIndicatorModel.objects.create(competence_in_group_of_pk=comp_general, indicator=indicator)
    return Response("γοητεία")


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def GetCompetenceMatrix(request, gen_pk):
    unique_wp = []  # Уникальные РПД в нескольких УП
    unique_practice = []  # Уникальные Практики в нескольких УП
    unique_gia = []  # Уникальные ГИА в нескольких УП
    gen_characteristic = GeneralCharacteristics.objects.get(pk=gen_pk)
    academic_plans = gen_characteristic.educational_program.all()
    pk_competences = PkCompetencesInGroupOfGeneralCharacteristicSerializer(
        instance=PkCompetencesInGroupOfGeneralCharacteristic.objects.filter(
            group_of_pk__general_characteristic_id=gen_pk, competence__isnull=False).distinct(),
        many=True).data
    general_prof_competences = GeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer(
        instance=GeneralProfCompetencesInGroupOfGeneralCharacteristic.objects.filter(
            group_of_pk__educational_standard=gen_characteristic.educational_standard,
            competence__isnull=False).distinct(), many=True).data
    key_competences = KeyCompetencesInGroupOfGeneralCharacteristicSerializer(
        instance=KeyCompetencesInGroupOfGeneralCharacteristic.objects.filter(
            group_of_pk__educational_standard=gen_characteristic.educational_standard,
            competence__isnull=False).distinct(), many=True).data
    over_prof_competences = OverProfCompetencesInGroupOfGeneralCharacteristicSerializer(
        instance=OverProfCompetencesInGroupOfGeneralCharacteristic.objects.filter(
            group_of_pk__educational_standard=gen_characteristic.educational_standard,
            competence__isnull=False).distinct(), many=True).data
    competence_matrix = {"pk_competences": pk_competences, "general_prof_competences": general_prof_competences,
                         "key_competences": key_competences, "over_prof_competences": over_prof_competences, }
    matrix_list = []
    for ap in academic_plans:
        academic_plan = ap.academic_plan
        academic_plan_matrix_dict = {"academic_plan": ap.title, "discipline_blocks_in_academic_plan": []}
        matrix_list.append(academic_plan_matrix_dict)
        for block in DisciplineBlock.objects.filter(academic_plan=academic_plan):
            block_dict = {"name": block.name, "modules_in_discipline_block": []}
            # academic_plan_matrix_dict["discipline_blocks_in_academic_plan"].append(block_dict)
            for block_module in DisciplineBlockModule.objects.filter(descipline_block=block):
                block_module_dict = recursion_module_matrix(block_module, unique_wp, unique_gia, unique_practice)
                if block_module_dict["change_blocks_of_work_programs_in_modules"] or block_module_dict["childs"]:
                    block_dict["modules_in_discipline_block"].append(block_module_dict)
            if block_dict["modules_in_discipline_block"]:
                academic_plan_matrix_dict["discipline_blocks_in_academic_plan"].append(block_dict)
        list_to_sort = academic_plan_matrix_dict["discipline_blocks_in_academic_plan"]
        newlist = sorted(list_to_sort, key=lambda d: d['name'])
        academic_plan_matrix_dict["discipline_blocks_in_academic_plan"] = newlist
    competence_matrix["wp_matrix"] = matrix_list
    competence_matrix["educational_program"] = ImplementationAcademicPlanSerializer(
        gen_characteristic.educational_program.all(), many=True).data
    # print(matrix_list)
    return Response(competence_matrix)


# @api_view(['POST'])
# @permission_classes((IsAuthenticated,))
# @transaction.atomic
# def academ_plan_check(request):
#
#     if .objects.filter(user = request.user, read = False).count()>0:
#         return Response({'message': 'you have new notifications', 'status': True}, status=200)
#     else:
#         return Response({'message': 'you have not new notifications', 'status': False}, status=400)


@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=None,
        properties={
            'new_status': openapi.Schema(type=openapi.TYPE_STRING,
                                         description="Новый статус после проверки (in_work / on_check) (необязательное поле)")
        }
    ),
    operation_description='Метод для изменения статусов учебного плана')
@api_view(['POST'])
@permission_classes((IsAuthenticated,))
@transaction.atomic
def academ_plan_check(request, ap_id):
    ap = AcademicPlan.objects.get(id=ap_id)
    if ap is not None:
        if ap.on_check == "on_check" and bool(request.user.groups.filter(name="expertise_master")):
            if request.data['new_status'] == 'in_work':
                ap.on_check = "in_work"
                ap.save()
            elif request.data['new_status'] == 'verified':
                ap.on_check = "verified"
                ap.save()
            return Response({'message': 'status changed', 'status': True}, status=200)
        mail_sender(topic=f'Учебный план с КОП ИД {ap.id} и ИСУ ИД {ap.ap_isu_id} готов к проверке',
                    text=f'Учебный план с КОП ИД {ap.id} и ИСУ ИД {ap.ap_isu_id} готов к проверке',
                    emails=['osop@itmo.ru'], users=[])
        ap.on_check = "on_check"
        ap.save()
        return Response({'message': 'email sent', 'status': True}, status=200)
    else:
        return Response({'message': 'academic plan was sent', 'status': False}, status=400)

@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=None,
        properties={
            'block': openapi.Schema(
                type=openapi.TYPE_INTEGER, description="id объекта discipline_blocks_in_academic_plan в учебном плане"),
            'new_ordinal_number': openapi.Schema(
                type=openapi.TYPE_INTEGER, description="Новый порядковый номер модуля (modules_in_discipline_block)"),
            'old_ordinal_number': openapi.Schema(
                type=openapi.TYPE_INTEGER, description="Старый порядковый номер модуля (modules_in_discipline_block)")
        }
    ),
    operation_description='Метод для изменения порядкового номера модуля в блоке учебного плана. '
                          'Для удаления элемента из списка new_ordinal_number равен = -1. '
                          'Любое другое значение - запрос на изменение порядка в списке.')
@api_view(['POST'])
@permission_classes((IsRpdDeveloperOrReadOnly,))
def new_ordinal_numbers_for_modules_in_ap(request):
    try:
        DisciplineBlockModule.new_ordinal_number(
            DisciplineBlock.objects.get(id=int(request.data.get('block'))),
            int(request.data.get('old_ordinal_number')),
            int(request.data.get('new_ordinal_number')))
        return Response(status=200)
    except:
        return Response(status=400)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def academic_plan_all_ids_by_year(request, year):
    academic_plan_all_ids = AcademicPlan.objects.filter(academic_plan_in_field_of_study__year=year) \
        .values_list('id', flat=True).distinct()
    return Response({"academic_plan_ids": academic_plan_all_ids})


@permission_classes((IsAdminUser,))
class UploadProfStandards(CreateAPIView):

    def post(self, request, *args, **kwargs):
        file = request.FILES["standards"]
        standards = pd.read_csv(file, delimiter=';', encoding="utf-8")
        for i, row in standards.iterrows():
            if pd.isnull(row["Номер (регистрационный)"]):
                break
            else:
                ProfessionalStandard.objects.create(registration_number=int(row["Номер (регистрационный)"]),
                                                    title=row["Название стандарта"],
                                                    name_of_prof_area=row["Наименование области проф. деятельности"],
                                                    code=str(row["Код ПС"]).split(".")[0],
                                                    code_of_prof_area=str(row["Код ПС"]))

        return Response("standards")


@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=None,
        properties={
            'new_status': openapi.Schema(type=openapi.TYPE_STRING,
                                         description="Новый статус после проверки (in_work / on_check) (необязательное поле)")
        }
    ),
    operation_description='Метод для изменения статусов общей характеристики')
@api_view(['POST'])
@permission_classes((IsAuthenticated,))
@transaction.atomic
def gh_check(request, gh_id):
    gh = GeneralCharacteristics.objects.get(id=gh_id)
    if gh is not None:
        if gh.on_check == "on_check" and bool(request.user.groups.filter(name="expertise_master")):
            if request.data['new_status'] == 'in_work':
                gh.on_check = "in_work"
                gh.save()
            elif request.data['new_status'] == 'verified':
                gh.on_check = "verified"
                gh.save()
            return Response({'message': 'status changed', 'status': True}, status=200)
        mail_sender(topic=f'Общая характеристика с КОП ИД {gh.id} готова к проверке',
                    text=f'Общая характеристика с КОП ИД {gh.id} готова к проверке',
                    emails=['osop@itmo.ru'], users=[])
        gh.on_check = "on_check"
        gh.save()
        return Response({'message': 'email sent', 'status': True}, status=200)
    else:
        return Response({'message': 'academic plan was sent', 'status': False}, status=400)