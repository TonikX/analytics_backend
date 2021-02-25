import datetime

from django.db.models import Count
# Сериализаторы
from rest_framework import filters
from rest_framework import generics, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Сериализаторы
from workprogramsapp.educational_program.serializers import EducationalCreateProgramSerializer, \
    EducationalProgramSerializer, \
    GeneralCharacteristicsSerializer, DepartmentSerializer, EducationalProgramUpdateSerializer, PkCompetencesInGeneralCharacteristicsSerializer
# --Работа с образовательной программой
from workprogramsapp.models import AcademicPlan
# --Работа с образовательной программой
from workprogramsapp.models import EducationalProgram, GeneralCharacteristics, Department, Profession, WorkProgram, PkCompetencesInGeneralCharacteristics
# Права доступа
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly


# Права доступа
# Модели данных


# Модели данных


# Блок реализации АПИ для КПУД интерфейсов

class EducationalProgramListAPIView(generics.ListAPIView):
    serializer_class = EducationalProgramSerializer
    queryset = EducationalProgram.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['qualification', 'year_of_recruitment', 'manager']
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
        GeneralCharacteristics.objects.filter(id = general_characteristic.id).update(educational_program = ep.id)


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


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def EducationalProgramRankingByProfession(request):
    professions_array = request.data.get('professions_array')
    range_settings = request.data.get('range_set')
    year_for_ap = []
    now = datetime.datetime.now()
    if now.month in range(2, 9):
        year_for_ap.append(str(now.year))
        year_for_ap.append(str(now.year - 1))
    else:
        year_for_ap.append(str(now.year))
        year_for_ap.append(str(now.year + 1))
    skills_array = []
    # Теперь при выборе нескольких профессий будет находить объединение их множеств умений
    for prof_id in professions_array:
        try:
            skills_in_prof = list(Profession.objects.get(pk=prof_id).skills.all())
            skills_array.extend(skills_in_prof)
            set_checker = set(skills_array) & set(skills_in_prof)
            skills_array = list(set_checker)
        except Profession.DoesNotExist:
            return Response(status=404)
    wp_with_skills = WorkProgram.objects.filter(outcomes__in=skills_array).annotate(Count('pk'))
    for work_program in wp_with_skills:
        work_program.coincidences = len(set(work_program.outcomes.all()) & set(skills_array))
        # Теперь в учбеном плане указан текущий год набора
    academic_plan_with_skills = AcademicPlan.objects.filter(
        discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__in=wp_with_skills,
        year__in=year_for_ap).annotate(
        Count('pk'))
    for ap in academic_plan_with_skills:
        wp_all = WorkProgram.objects.filter(
            zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan=ap)
        set_of_wp = (set(wp_with_skills) & set(wp_all))
        if range_settings == "skills":
            ap.weight = sum(item.coincidences for item in set_of_wp)
        elif range_settings == "work_program":
            # При выборе ранжирования "по рабочим программам" ранжирует оп удельному весу рабочих программ в данном учбеном плане
            ap.weight = len(set_of_wp) / len(wp_all)

    sorted_academic_plan = sorted(academic_plan_with_skills, key=lambda ac_pl: (ac_pl.weight), reverse=True)
    list_of_educational_program = []
    for s in sorted_academic_plan:
        list_of_educational_program.extend(
            list(EducationalProgram.objects.filter(academic_plan_for_ep__academic_plan=s)))
    serializer = EducationalProgramSerializer(list_of_educational_program, many=True)
    return Response(serializer.data)


class PkCompetencesInGeneralCharacteristicsSet(viewsets.ModelViewSet):
    queryset = PkCompetencesInGeneralCharacteristics.objects.all()
    serializer_class = PkCompetencesInGeneralCharacteristicsSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)