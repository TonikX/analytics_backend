from django_cte import With
from django_print_sql import print_sql_decorator
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from dataprocessing.models import Items
from workprogramsapp.ap_improvment.module_ze_counter import make_modules_cte_up
from workprogramsapp.ap_improvment.serializers import ImplementationAcademicPlanForCompsSSerializer
from workprogramsapp.models import Competence, Zun, Indicator, DisciplineBlockModule, ImplementationAcademicPlan, \
    WorkProgramInFieldOfStudy
from workprogramsapp.serializers import IndicatorSerializer, ImplementationAcademicPlanSerializer, \
    WorkProgramInFieldOfStudySerializerForCb, ImplementationAcademicPlanForWPinFSSerializer


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
# Проще генерировать словари с зунами индикаторами и компетенциями
# Переписать логику сборки словаря
@print_sql_decorator(count_only=False)
def get_all_competences_and_indicators_for_wp_cte(request, wp_id):
    zuns = Zun.objects.filter(
        wp_in_fs__work_program__id=wp_id, indicator_in_zun__isnull=False).select_related("indicator_in_zun", "wp_in_fs",
                                                         "indicator_in_zun__competence").prefetch_related(
        "items", "items__item").distinct()
    competences_dict = {}
    cte = With.recursive(make_modules_cte_up)
    modules = (
        cte.join(DisciplineBlockModule.cte_objects.all(), id=cte.col.id).annotate(
            recursive_name=cte.col.recursive_name,
            recursive_id=cte.col.recursive_id, depth=cte.col.depth, p=cte.col.p).filter(
            change_blocks_of_work_programs_in_modules__work_program=wp_id, p__isnull=True).with_cte(
            cte)
    )
    for module in modules:
        module.zuns_ids = [zun.id for zun in Zun.objects.filter(
            wp_in_fs__work_program_change_in_discipline_block_module__discipline_block_module__id=module.id)]
        imps = ImplementationAcademicPlan.objects.filter(
            academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__id=module.recursive_id).select_related("academic_plan").prefetch_related("field_of_study")
        module.serialized_imps = ImplementationAcademicPlanForCompsSSerializer(imps, many=True).data
    for zun in zuns:
        indicator = zun.indicator_in_zun
        indicator_dict = IndicatorSerializer(indicator).data

        outcomes = zun.items.all()
        items_array = [{"id": out.item.id, "name": out.item.name} for out in outcomes]
        modules_ids = []
        #queryset_imps = ImplementationAcademicPlan.objects.none()
        serialized_imps = []
        for module in modules:
            if zun.id in module.zuns_ids:
                serialized_imps.extend(module.serialized_imps)
        """modules_for_zun = modules.filter(change_blocks_of_work_programs_in_modules__zuns_for_cb__zun_in_wp__id=zun.id)

        modules_ids = [module.recursive_id for module in modules_for_zun]

        queryset = ImplementationAcademicPlan.objects.filter(
            academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__id__in=modules_ids).prefetch_related("field_of_study")
            """
        #serializer = ImplementationAcademicPlanForWPinFSSerializer(queryset_imps, many=True)

        zuns_obj = {"id": zun.id, "knowledge": zun.knowledge, "skills": zun.skills,
                    "attainments": zun.attainments, "indicator": indicator_dict,
                    "items": items_array, "educational_program": serialized_imps,
                    "wp_in_fs": zun.wp_in_fs.id}
        competence = indicator.competence
        competence_dict_obj = competences_dict.get(competence.id)
        if competence_dict_obj:
            competence_dict_obj["zuns"].append(zuns_obj)
        else:
            competences_dict[competence.id]={"id": competence.id, "name": competence.name, "number": competence.number,
                                     "zuns": [zuns_obj]}
    return Response({"competences": list(competences_dict.values())})


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
@print_sql_decorator(count_only=False)
def get_all_ap_with_competences_and_indicators_cte(request, wp_id):
    """

    В GET-параметры можно передать
    ap_id - id объекта AcademicPlan для фильтрации
    imp_id - id объекта ImplementationAcademicPlan для фильтрации
    year - фильтр по годам УП
    """
    ap_id = request.GET.get("ap_id")
    imp_id = request.GET.get("imp_id")

    competences_dict = {}
    cte = With.recursive(make_modules_cte_up)
    modules = (
        cte.join(DisciplineBlockModule.cte_objects.all(), id=cte.col.id).annotate(
            recursive_name=cte.col.recursive_name,
            recursive_id=cte.col.recursive_id, depth=cte.col.depth, p=cte.col.p).filter(
            change_blocks_of_work_programs_in_modules__work_program=wp_id, p__isnull=True).with_cte(
            cte)
    )
    if ap_id:
        imp = ImplementationAcademicPlan.objects.get(academic_plan__id=ap_id)
    if imp_id:
        imp = ImplementationAcademicPlan.objects.get(id=imp_id)
    upper_modules_id = [module.id for module in DisciplineBlockModule.objects.filter(
        descipline_block__academic_plan__academic_plan_in_field_of_study=imp)]
    lower_modules = []

    for module in modules:
        if module.recursive_id in upper_modules_id:
            lower_modules.append(module.id)

    zuns = Zun.objects.filter(
        wp_in_fs__work_program_change_in_discipline_block_module__discipline_block_module__id__in=lower_modules,
        wp_in_fs__work_program__id=wp_id, indicator_in_zun__isnull=False). \
        select_related("indicator_in_zun", "indicator_in_zun__competence"). \
        prefetch_related("items", "items__item").distinct()

    for zun in zuns:
        indicator = zun.indicator_in_zun
        indicator_dict = IndicatorSerializer(indicator).data

        outcomes = zun.items.all()
        items_array = [{"id": out.item.id, "name": out.item.name} for out in outcomes]

        zuns_obj = {"id": zun.id, "knowledge": zun.knowledge, "skills": zun.skills,
                    "attainments": zun.attainments, "indicator": indicator_dict,
                    "items": items_array}
        competence = indicator.competence
        competence_dict_obj = competences_dict.get(competence.id)
        if competence_dict_obj:
            competence_dict_obj["zuns"].append(zuns_obj)
        else:
            competences_dict[competence.id] = {"id": competence.id, "name": competence.name,
                                               "number": competence.number,
                                               "zuns": [zuns_obj]}
    dict_with_ap = dict(ImplementationAcademicPlanForCompsSSerializer(imp, many=False).data)
    dict_with_ap["competences"] = list(competences_dict.values())
    return Response([dict_with_ap])

"""for competence in competences:
        zuns = Zun.objects.filter(wp_in_fs__work_program__id=wp_id,
                                  indicator_in_zun__competence__id=competence.id).order_by("indicator_in_zun__number")
        for zun in zuns:
            try:
                indicator = Indicator.objects.get(competence=competence.id,
                                                  zun__id=zun.id)
                indicator = IndicatorSerializer(indicator).data
            except:
                indicator = None

            items_array = []
            items = Items.objects.filter(item_in_outcomes__item_in_wp__id=zun.id,
                                         item_in_outcomes__item_in_wp__wp_in_fs__work_program__id=wp_id,
                                         item_in_outcomes__item_in_wp__indicator_in_zun__competence__id=competence.id)
            for item in items:
                items_array.append({"id": item.id, "name": item.name})
            modules = DisciplineBlockModule.objects.filter(
                change_blocks_of_work_programs_in_modules__zuns_for_cb__zun_in_wp__id=zun.id)
            queryset = ImplementationAcademicPlan.get_all_imp_by_modules(modules=modules).distinct()
            if imp_id:
                queryset = queryset.filter(academic_plan__id=imp_id)
            if ap_id:
                queryset = queryset.filter(academic_plan__id=ap_id)
            if year:
                queryset = queryset.filter(year=year)
            for ap in queryset:
                dict_with_ap = None
                for ap_dict in ap_list_dict:
                    if ap.id == ap_dict["id"]:
                        dict_with_ap = ap_dict
                        break
                if not dict_with_ap:
                    dict_with_ap = dict(ImplementationAcademicPlanShortSerializer(ap, many=False).data)
                    dict_with_ap["competences"] = [
                        {"id": competence.id, "name": competence.name, "number": competence.number,
                         "zuns": [{"id": zun.id, "knowledge": zun.knowledge, "skills": zun.skills,
                                   "attainments": zun.attainments, "indicator": indicator,
                                   "items": items_array}]}]
                    ap_list_dict.append(dict_with_ap)
                else:
                    dict_with_competences = None
                    for competence_dict in dict_with_ap["competences"]:
                        if competence.id == competence_dict["id"]:
                            dict_with_competences = competence_dict
                    if not dict_with_competences:
                        dict_with_ap["competences"].append(
                            {"id": competence.id, "name": competence.name, "number": competence.number,
                             "zuns": [{"id": zun.id, "knowledge": zun.knowledge, "skills": zun.skills,
                                       "attainments": zun.attainments, "indicator": indicator,
                                       "items": items_array}]})
                    else:
                        dict_with_competences["zuns"].append(
                            {"id": zun.id, "knowledge": zun.knowledge, "skills": zun.skills,
                             "attainments": zun.attainments, "indicator": indicator,
                             "items": items_array})"""

