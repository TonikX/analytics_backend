import datetime

from django.db.models import Count
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response

from dataprocessing.models import Items
from workprogramsapp.educational_program.serializers import EducationalProgramSerializer
from workprogramsapp.models import Profession, WorkProgram, AcademicPlan, DisciplineBlockModule, \
    WorkProgramChangeInDisciplineBlockModule, EducationalProgram, SkillsOfProfession, ImplementationAcademicPlan
from workprogramsapp.op_slection.temp__skills_array import skill_sorter
from workprogramsapp.profession.serializers import ProfessionSerializer
from workprogramsapp.serializers import ImplementationAcademicPlanSerializer


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def CreateProfessionByKeywords(request):
    keywords_dict = request.data.get('keywords_dict')
    profession_name = request.data.get('profession_name')
    num_of_prof = request.data.get('num_of_prof')
    str_skills_key, str_skills_additional = skill_sorter(keywords_dict, int(num_of_prof))
    skills_key = list(Items.objects.filter(name__in=str_skills_key))
    skills_additional = list(Items.objects.filter(name__in=str_skills_additional))
    for key in str_skills_key:
        if not Items.objects.filter(name=key):
            item = Items.objects.create(name=key)
            skills_key.append(item)
    for key in str_skills_additional:
        if not Items.objects.filter(name=key):
            item = Items.objects.create(name=key)
            skills_additional.append(item)
    prof = Profession.objects.create(title=profession_name)
    for skill in skills_key:
        SkillsOfProfession.objects.create(item=skill, profession=prof, masterylevel=3)
    for skill in skills_additional:
        SkillsOfProfession.objects.create(item=skill, profession=prof, masterylevel=2)
    serializer = ProfessionSerializer(prof)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((AllowAny,))
def EducationalProgramRankingByProfessionScientific(request):
    # Передаваемые значения
    professions_array = request.data.get('professions_array')
    qualification = request.data.get('qualification')

    # Выбор актуального года для ОП
    year_for_ap = []
    now = datetime.datetime.now()
    if now.month in range(2, 9):
        year_for_ap.append(str(now.year))
        year_for_ap.append(str(now.year - 1))
    else:
        year_for_ap.append(str(now.year))
        year_for_ap.append(str(now.year + 1))

    skills_key_in_prof = []
    skills_add_in_prof = []
    # Создание списка умений из профессии. Если выбрано несколько профессий, то находится пересечение множества скиллов
    for prof_id in professions_array:
        try:
            skills_key_in_prof.extend(
                list(Items.objects.filter(item_in_sop__profession=prof_id, item_in_sop__masterylevel=3)))
            skills_add_in_prof.extend(
                list(Items.objects.filter(item_in_sop__profession=prof_id, item_in_sop__masterylevel=2)))
        except SkillsOfProfession.DoesNotExist:
            return Response(status=404)
    skills_key = []
    skills_additional = []
    for skill in skills_key_in_prof:
        skills_key.extend(list(Items.objects.filter(name__contains=skill.name)))
    for skill in skills_add_in_prof:
        skills_additional.extend(list(Items.objects.filter(name__contains=skill.name)))
    # Получение списка всех РПД с представленными скилами, добавление к Queryset РПД искомых скиллов отедльным полем
    wp_with_skills = WorkProgram.objects.filter(outcomes__in=skills_key + skills_additional).annotate(
        Count('pk'))
    for work_program in wp_with_skills:
        # work_program.coincidences = len(set(work_program.outcomes.all()) & set(skills_array))
        # work_program.skills_list = list(set(work_program.outcomes.all()) & set(skills_array))

        work_program.skills_key = list(set(work_program.outcomes.all()) & set(skills_key))
        work_program.skills_add = list(set(work_program.outcomes.all()) & set(skills_additional))

    # Получение всех УП из списка РПД со скиллами
    academic_plan_with_skills = AcademicPlan.objects.filter(
        discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__in=wp_with_skills,
        year="2020", qualification=qualification).annotate(
        Count('pk'))
    # Считаем метрики
    max_coverage = 0
    min_coverage = float('inf')
    max_focus = 0
    min_focus = float('inf')
    for ap in academic_plan_with_skills:

        wp_all = WorkProgram.objects.filter(
            zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan=ap)
        set_of_wp = []  # (set(wp_with_skills) & set(wp_all))
        set_of_key_wp = []  # (set(key_wp) & set(wp_all))
        for wp in wp_with_skills:
            if wp in wp_all:
                set_of_wp.append(wp)
                if len(wp.skills_key) > 0:
                    set_of_key_wp.append(wp)

        """"
            Расчет фокуса: проходимся по каждому модулю и ченджблокмодулю внутри, считаем ченджблок моудли для РПД 
            и отдельно обрабатываем моудли специализации, используем самый большой вес специализации для  подсчета
        """
        ap_specialization_discipline_weight = -1
        ap_specialization_wp_count = 0
        wp_count = 0
        discipline_weight = 0
        for module in DisciplineBlockModule.objects.filter(descipline_block__academic_plan=ap):
            if not (module.type == "ognp" or "ОГНП" in module.name or "Факультатив" in module.name):
                wp_count__local = 0
                discipline_weight__local = 0
                for change in WorkProgramChangeInDisciplineBlockModule.objects.filter(discipline_block_module=module):
                    wp_count__local += 1
                    for wp in WorkProgram.objects.filter(
                            zuns_for_wp__work_program_change_in_discipline_block_module=change):
                        if wp in set_of_wp:
                            discipline_weight__local += 1
                            break
                if module.type == "specialization_module" or "Специализация" in module.name:
                    if ap_specialization_discipline_weight < discipline_weight__local:
                        ap_specialization_discipline_weight = discipline_weight__local
                        ap_specialization_wp_count = wp_count__local
                else:
                    wp_count += wp_count__local
                    discipline_weight += discipline_weight__local

        # Вычисление параметра фокуса для отдельного УП
        ap.focus = (discipline_weight + ap_specialization_discipline_weight) / (wp_count + ap_specialization_wp_count)
        key_coverage = len(set([val for item in set_of_wp for val in item.skills_key])) / len(skills_key)
        add_coverage = len(set([val for item in set_of_wp for val in item.skills_add])) / len(skills_additional)
        coof = 0.8
        ap.coverage = coof * (key_coverage) + (1 - coof) * (add_coverage)
        if ap.coverage > max_coverage:
            max_coverage = ap.coverage
        if ap.coverage < min_coverage:
            min_coverage = ap.coverage
        if ap.focus > max_focus:
            max_focus = ap.focus
        if ap.focus < min_focus:
            min_focus = ap.focus

        # ap.metrics = 2 * (ap.coverage * ap.focus) / (ap.coverage + ap.focus)
    for ap in academic_plan_with_skills:
        ap.coverage= 0.01+(ap.coverage - min_coverage)*(1-0.01)/(max_coverage-min_coverage)
        ap.focus= 0.01+( ap.focus - min_focus)*(1-0.01)/(max_focus-min_focus)
        ap.metrics = 2 * (ap.coverage * ap.focus) / (ap.coverage + ap.focus)
    # Cортировка--
    sorted_academic_plan = sorted(academic_plan_with_skills, key=lambda ac_pl: ac_pl.metrics, reverse=True)
    # for i in sorted_academic_plan: print(i, i.metrics)
    list_of_educational_program = []
    for s in sorted_academic_plan:
        print(str({"name": str(s), "coverage": s.coverage, "focus": s.focus}) + ",")
        for implementation in ImplementationAcademicPlan.objects.filter(academic_plan=s):
            serializer = ImplementationAcademicPlanSerializer(implementation, many=False)
            updated_serializer = dict(serializer.data)
            updated_serializer["metrics"] = s.metrics
            list_of_educational_program.append(updated_serializer)
    return Response(list_of_educational_program)


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
