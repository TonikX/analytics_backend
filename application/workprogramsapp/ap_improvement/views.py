from django_cte import With
from drf_spectacular.utils import extend_schema
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from workprogramsapp.ap_improvement.module_ze_counter import make_modules_cte_up_for_wp
from workprogramsapp.ap_improvement.serializers import (
    ImplementationAcademicPlanForCompsSSerializer,
)
from workprogramsapp.models import (
    Zun,
    DisciplineBlockModule,
    ImplementationAcademicPlan,
)
from workprogramsapp.serializers import IndicatorSerializer


@extend_schema(methods=["GET"], request=None, responses=None)
@api_view(["GET"])
@permission_classes((IsAuthenticated,))
# Проще генерировать словари с зунами индикаторами и компетенциями
# Переписать логику сборки словаря
def get_all_competences_and_indicators_for_wp_cte(request, wp_id):
    zuns = (
        Zun.objects.filter(
            wp_in_fs__work_program__id=wp_id, indicator_in_zun__isnull=False
        )
        .select_related("indicator_in_zun", "wp_in_fs", "indicator_in_zun__competence")
        .prefetch_related("items", "items__item")
        .distinct()
    )
    competences_dict = {}
    cte = With(None, "module_cte", False)
    cte.query = make_modules_cte_up_for_wp(cte, wp_id).query
    modules = cte.queryset().with_cte(cte).filter(descipline_block__id__isnull=False)
    for module in modules:
        module["zuns_ids"] = [
            zun.id
            for zun in Zun.objects.filter(
                wp_in_fs__work_program_change_in_discipline_block_module__discipline_block_module__id=module[
                    "recursive_id"
                ]
            )
        ]
        imps = (
            ImplementationAcademicPlan.objects.filter(
                academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__id=module[
                    "id"
                ]
            )
            .select_related("academic_plan")
            .prefetch_related("field_of_study")
        )
        module["serialized_imps"] = ImplementationAcademicPlanForCompsSSerializer(
            imps, many=True
        ).data
    for zun in zuns:
        indicator = zun.indicator_in_zun
        indicator_dict = IndicatorSerializer(indicator).data

        outcomes = zun.items.all()
        items_array = [{"id": out.item.id, "name": out.item.name} for out in outcomes]
        serialized_imps = []
        for module in modules:
            if zun.id in module["zuns_ids"]:
                serialized_imps.extend(module["serialized_imps"])

        zuns_obj = {
            "id": zun.id,
            "knowledge": zun.knowledge,
            "skills": zun.skills,
            "attainments": zun.attainments,
            "indicator": indicator_dict,
            "items": items_array,
            "educational_program": serialized_imps,
            "wp_in_fs": zun.wp_in_fs.id,
        }
        competence = indicator.competence
        competence_dict_obj = competences_dict.get(competence.id)
        if competence_dict_obj:
            competence_dict_obj["zuns"].append(zuns_obj)
        else:
            competences_dict[competence.id] = {
                "id": competence.id,
                "name": competence.name,
                "number": competence.number,
                "zuns": [zuns_obj],
            }
    return Response({"competences": list(competences_dict.values())})


@extend_schema(methods=["GET"], request=None, responses=None)
@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def get_all_ap_with_competences_and_indicators_cte(request, wp_id):
    """В GET-параметры можно передать.

    ap_id - id объекта AcademicPlan для фильтрации
    imp_id - id объекта ImplementationAcademicPlan для фильтрации
    """
    ap_id = request.GET.get("ap_id")
    imp_id = request.GET.get("imp_id")

    competences_dict = {}
    cte = With(None, "module_cte", False)
    cte.query = make_modules_cte_up_for_wp(cte, wp_id).query
    modules = cte.queryset().with_cte(cte).filter(descipline_block__id__isnull=False)
    if ap_id:
        imp = ImplementationAcademicPlan.objects.get(academic_plan__id=ap_id)
    if imp_id:
        imp = ImplementationAcademicPlan.objects.get(id=imp_id)
    upper_modules_id = [
        module.id
        for module in DisciplineBlockModule.objects.filter(
            descipline_block__academic_plan__academic_plan_in_field_of_study=imp
        )
    ]
    lower_modules = []

    for module in modules:
        if module["id"] in upper_modules_id:
            lower_modules.append(module["recursive_id"])

    zuns = (
        Zun.objects.filter(
            wp_in_fs__work_program_change_in_discipline_block_module__discipline_block_module__id__in=lower_modules,
            wp_in_fs__work_program__id=wp_id,
            indicator_in_zun__isnull=False,
        )
        .select_related("indicator_in_zun", "indicator_in_zun__competence")
        .prefetch_related("items", "items__item")
        .distinct()
    )

    for zun in zuns:
        indicator = zun.indicator_in_zun
        indicator_dict = IndicatorSerializer(indicator).data

        outcomes = zun.items.all()
        items_array = [{"id": out.item.id, "name": out.item.name} for out in outcomes]

        zuns_obj = {
            "id": zun.id,
            "knowledge": zun.knowledge,
            "skills": zun.skills,
            "attainments": zun.attainments,
            "indicator": indicator_dict,
            "items": items_array,
        }
        competence = indicator.competence
        competence_dict_obj = competences_dict.get(competence.id)
        if competence_dict_obj:
            competence_dict_obj["zuns"].append(zuns_obj)
        else:
            competences_dict[competence.id] = {
                "id": competence.id,
                "name": competence.name,
                "number": competence.number,
                "zuns": [zuns_obj],
            }
    dict_with_ap = dict(
        ImplementationAcademicPlanForCompsSSerializer(imp, many=False).data
    )
    dict_with_ap["competences"] = list(competences_dict.values())
    return Response([dict_with_ap])
