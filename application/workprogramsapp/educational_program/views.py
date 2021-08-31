import datetime
from pprint import pprint

from django.db.models import Count
# Сериализаторы
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import generics, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response

# Сериализаторы
from workprogramsapp.educational_program.serializers import EducationalCreateProgramSerializer, \
    EducationalProgramSerializer, \
    GeneralCharacteristicsSerializer, DepartmentSerializer, EducationalProgramUpdateSerializer
from .competence_handler import competence_dict_generator
from .general_prof_competencies.models import IndicatorInGeneralProfCompetenceInGeneralCharacteristic, \
    GeneralProfCompetencesInGroupOfGeneralCharacteristic, GroupOfGeneralProfCompetencesInGeneralCharacteristic
from .key_competences.models import IndicatorInKeyCompetenceInGeneralCharacteristic, \
    KeyCompetencesInGroupOfGeneralCharacteristic, GroupOfKeyCompetencesInGeneralCharacteristic
from .over_professional_competencies.models import GroupOfOverProfCompetencesInGeneralCharacteristic, \
    OverProfCompetencesInGroupOfGeneralCharacteristic, IndicatorInOverProfCompetenceInGeneralCharacteristic
from .pk_comptencies.models import GroupOfPkCompetencesInGeneralCharacteristic, \
    PkCompetencesInGroupOfGeneralCharacteristic, IndicatorInPkCompetenceInGeneralCharacteristic

from .serializers import ProfessionalStandardSerializer

# --Работа с образовательной программой
from workprogramsapp.models import EducationalProgram, GeneralCharacteristics, Department, Profession, WorkProgram, \
    ImplementationAcademicPlan, Competence, Indicator
from workprogramsapp.models import ProfessionalStandard

# Права доступа
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly


# Блок реализации АПИ для КПУД интерфейсов

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
    search_fields = ['educational_program', 'area_of_activity']
    permission_classes = [IsRpdDeveloperOrReadOnly]


class GeneralCharacteristicsCreateAPIView(generics.CreateAPIView):
    serializer_class = GeneralCharacteristicsSerializer
    queryset = GeneralCharacteristics.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]


class GeneralCharacteristicsDestroyView(generics.DestroyAPIView):
    queryset = GeneralCharacteristics.objects.all()
    serializer_class = GeneralCharacteristicsSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class GeneralCharacteristicsUpdateView(generics.UpdateAPIView):
    queryset = GeneralCharacteristics.objects.all()
    serializer_class = GeneralCharacteristicsSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class GeneralCharacteristicsDetailsView(generics.RetrieveAPIView):
    queryset = GeneralCharacteristics.objects.all()
    serializer_class = GeneralCharacteristicsSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


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
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def UploadCompetences(request):
    csv_path = "workprogramsapp/educational_program/competence.csv"
    # Генерируем словарь компетенций из CSV
    dict_of_competences = competence_dict_generator(csv_path)

    for op in dict_of_competences:
        # Существует ли генеральная характеристика и таблица EducationalProgram или же ее надо создавать для УП
        print(op["id_op"])
        try:
            educational_program = EducationalProgram.objects.get(academic_plan_for_ep__academic_plan__pk=op["id_op"])
            general_characteristic = GeneralCharacteristics.objects.get(educational_program=educational_program)
        except EducationalProgram.DoesNotExist:
            academic_plan_for_ep = ImplementationAcademicPlan.objects.get(pk=op["id_op"])
            educational_program = EducationalProgram.objects.create(academic_plan_for_ep=academic_plan_for_ep)
            general_characteristic = GeneralCharacteristics.objects.create(educational_program=educational_program)
        except GeneralCharacteristics.DoesNotExist:
            general_characteristic = GeneralCharacteristics.objects.create(educational_program=educational_program)

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
                    indicator_from_db.append(
                        Indicator.objects.create(number=indicator["id_indicator"], name=indicator["indicator_name"],
                                                 competence=competence_to_add))

            if competence["competence_type"] == "Профессиональные компетенции":
                CompGroupModel = GroupOfPkCompetencesInGeneralCharacteristic
                CompGeneralModel = PkCompetencesInGroupOfGeneralCharacteristic
                CompIndicatorModel = IndicatorInPkCompetenceInGeneralCharacteristic
            elif competence["competence_type"] == "Надпрофессиональные компетенции":
                CompGroupModel = GroupOfOverProfCompetencesInGeneralCharacteristic
                CompGeneralModel = OverProfCompetencesInGroupOfGeneralCharacteristic
                CompIndicatorModel = IndicatorInOverProfCompetenceInGeneralCharacteristic
            elif competence["competence_type"] == "Ключевые компетенции":
                CompGroupModel = GroupOfKeyCompetencesInGeneralCharacteristic
                CompGeneralModel = KeyCompetencesInGroupOfGeneralCharacteristic
                CompIndicatorModel = IndicatorInKeyCompetenceInGeneralCharacteristic
            elif competence["competence_type"] == "Общепрофессиональные компетенции":
                CompGroupModel = GroupOfGeneralProfCompetencesInGeneralCharacteristic
                CompGeneralModel = GeneralProfCompetencesInGroupOfGeneralCharacteristic
                CompIndicatorModel = IndicatorInGeneralProfCompetenceInGeneralCharacteristic
            pprint(competence_to_add)
            pprint(indicator_from_db)
            comp_group, created = CompGroupModel.objects.get_or_create(name=competence["competence_group"],
                                                                       general_characteristic=general_characteristic)
            comp_general = CompGeneralModel.objects.create(group_of_pk=comp_group, competence=competence_to_add)
            for indicator in indicator_from_db:
                CompIndicatorModel.objects.create(competence_in_group_of_pk=comp_general, indicator=indicator)
    return Response("γοητεία")
