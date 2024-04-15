from django_cte import With
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from workprogramsapp.ap_improvment.module_ze_counter import make_modules_cte_down
from workprogramsapp.ap_improvment.serializers import ImplementationAcademicPlanForCompsSSerializer, \
    PkCompetencesInGroupOfGeneralCharacteristicSerializerForMatrix
from workprogramsapp.educational_program.general_prof_competencies.models import \
    GeneralProfCompetencesInGroupOfGeneralCharacteristic
from workprogramsapp.educational_program.general_prof_competencies.serializers import \
    GeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer
from workprogramsapp.educational_program.key_competences.models import KeyCompetencesInGroupOfGeneralCharacteristic
from workprogramsapp.educational_program.key_competences.serializers import \
    KeyCompetencesInGroupOfGeneralCharacteristicSerializer
from workprogramsapp.educational_program.over_professional_competencies.models import \
    OverProfCompetencesInGroupOfGeneralCharacteristic
from workprogramsapp.educational_program.over_professional_competencies.serializers import \
    OverProfCompetencesInGroupOfGeneralCharacteristicSerializer
from workprogramsapp.educational_program.pk_comptencies.models import PkCompetencesInGroupOfGeneralCharacteristic
from workprogramsapp.educational_program.pk_comptencies.serializers import \
    PkCompetencesInGroupOfGeneralCharacteristicSerializer
from workprogramsapp.models import GeneralCharacteristics, DisciplineBlockModule, Zun
from workprogramsapp.serializers import IndicatorSerializer, ImplementationAcademicPlanSerializer


def get_competences_wp(wp_in_fs):
    competences_dict = {}
    zuns = wp_in_fs.zun_in_wp.all()

    for zun in zuns:

        indicator = zun.indicator_in_zun
        if not indicator:
            continue
        indicator_dict = IndicatorSerializer(indicator).data

        zuns_obj = {"id": zun.id, "indicator": indicator_dict, }
        competence = indicator.competence
        competence_dict_obj = competences_dict.get(competence.id)
        if competence_dict_obj:
            competence_dict_obj["zuns"].append(zuns_obj)
        else:
            competences_dict[competence.id] = {"id": competence.id, "name": competence.name,
                                               "number": competence.number,
                                               "zuns": [zuns_obj]}
    return {"competences": list(competences_dict.values())}


def get_competences_practice(practice_in_fs):
    competences_dict = {}
    zuns = practice_in_fs.zun_in_practice.all()

    for zun in zuns:
        indicator = zun.indicator_in_zun
        indicator_dict = IndicatorSerializer(indicator).data

        zuns_obj = {"id": zun.id, "indicator": indicator_dict, }
        competence = indicator.competence
        competence_dict_obj = competences_dict.get(competence.id)
        if competence_dict_obj:
            competence_dict_obj["zuns"].append(zuns_obj)
        else:
            competences_dict[competence.id] = {"id": competence.id, "name": competence.name,
                                               "number": competence.number,
                                               "zuns": [zuns_obj]}
    return {"competences": list(competences_dict.values())}

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def GetCompetenceMatrixCTE(request, gen_pk):
    unique_wp = []  # Уникальные РПД в нескольких УП
    unique_practice = []  # Уникальные Практики в нескольких УП
    unique_gia = []  # Уникальные ГИА в нескольких УП
    gen_characteristic = GeneralCharacteristics.objects.get(pk=gen_pk)
    academic_plans = gen_characteristic.educational_program.all().select_related("academic_plan").\
        prefetch_related(
        "academic_plan__discipline_blocks_in_academic_plan",
        "academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block")
    pk_competences = PkCompetencesInGroupOfGeneralCharacteristicSerializerForMatrix(
        instance=PkCompetencesInGroupOfGeneralCharacteristic.objects.filter(
            group_of_pk__general_characteristic_id=gen_pk, competence__isnull=False).select_related("competence")
        .prefetch_related("indicator_of_competence_in_group_of_pk_competences",
                          "indicator_of_competence_in_group_of_pk_competences__indicator").order_by(
            "competence__number").distinct(),
        many=True).data
    general_prof_competences = GeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer(
        instance=GeneralProfCompetencesInGroupOfGeneralCharacteristic.objects.filter(
            group_of_pk__educational_standard=gen_characteristic.educational_standard,
            competence__isnull=False).select_related("competence")
        .prefetch_related("indicator_of_competence_in_group_of_general_prof_competences",
                          "indicator_of_competence_in_group_of_general_prof_competences__indicator").
        order_by("competence__number").distinct(), many=True).data
    key_competences = KeyCompetencesInGroupOfGeneralCharacteristicSerializer(
        instance=KeyCompetencesInGroupOfGeneralCharacteristic.objects.filter(
            group_of_pk__educational_standard=gen_characteristic.educational_standard,
            competence__isnull=False).select_related("competence")
        .prefetch_related("indicator_of_competence_in_group_of_key_competences",
                          "indicator_of_competence_in_group_of_key_competences__indicator").order_by(
            "competence__number").distinct(), many=True).data
    over_prof_competences = OverProfCompetencesInGroupOfGeneralCharacteristicSerializer(
        instance=OverProfCompetencesInGroupOfGeneralCharacteristic.objects.filter(
            group_of_pk__educational_standard=gen_characteristic.educational_standard,
            competence__isnull=False).select_related("competence")
        .prefetch_related("indicator_of_competence_in_group_of_over_prof_competences",
                          "indicator_of_competence_in_group_of_over_prof_competences__indicator").order_by(
            "competence__number").distinct(), many=True).data
    competence_matrix = {"pk_competences": pk_competences, "general_prof_competences": general_prof_competences,
                         "key_competences": key_competences, "over_prof_competences": over_prof_competences, }
    matrix_list = []
    first_ap_iter = True

    for ap in academic_plans:
        academic_plan = ap.academic_plan
        academic_plan_matrix_dict = {"academic_plan": ap.title, "ap_id": ap.id, "ap_isu_id": ap.ap_isu_id,
                                     "discipline_blocks_in_academic_plan": []}
        matrix_list.append(academic_plan_matrix_dict)
        for block in academic_plan.discipline_blocks_in_academic_plan.all():
            if not ("1" in block.name or "2" in block.name):
                continue
            block_dict = {"name": block.name, "modules_in_discipline_block": []}
            cte = With(None, "module_cte", False)
            cte.query = make_modules_cte_down(cte, DisciplineBlockModule.cte_objects.filter(
                descipline_block=block)).query
            modules = (
                cte.join(DisciplineBlockModule.cte_objects.filter(descipline_block=block), id=cte.col.id).annotate(
                    recursive_name=cte.col.recursive_name,
                    recursive_id=cte.col.recursive_id, depth=cte.col.depth, p=cte.col.p).filter(
                     p__isnull=True).with_cte(
                    cte)
            )
            modules_lower_ids = [module.recursive_id for module in modules]
            modules_lower = DisciplineBlockModule.objects.filter(id__in=modules_lower_ids). \
                prefetch_related("change_blocks_of_work_programs_in_modules",
                                 "change_blocks_of_work_programs_in_modules__zuns_for_cb",
                                 "change_blocks_of_work_programs_in_modules__zuns_for_cb__work_program",
                                 "change_blocks_of_work_programs_in_modules__zuns_for_cb__zun_in_wp",
                                 "change_blocks_of_work_programs_in_modules__zuns_for_cb__zun_in_wp__indicator_in_zun",
                                 "change_blocks_of_work_programs_in_modules__zuns_for_cb__zun_in_wp__indicator_in_zun__competence",

                                 "change_blocks_of_work_programs_in_modules__zuns_for_cb_for_practice",
                                 "change_blocks_of_work_programs_in_modules__zuns_for_cb_for_practice__practice",
                                 "change_blocks_of_work_programs_in_modules__zuns_for_cb_for_practice__zun_in_practice__indicator_in_zun",
                                 "change_blocks_of_work_programs_in_modules__zuns_for_cb_for_practice__zun_in_practice__indicator_in_zun__competence")
            for module in modules_lower:
                block_module_dict = {"name": module.name, "type": module.type,
                                     "change_blocks_of_work_programs_in_modules": [], "childs": []}
                for change_block in module.change_blocks_of_work_programs_in_modules.all():
                    change_block_dict = {"change_type": change_block.change_type,
                                         "credit_units": change_block.credit_units, "work_program": [], "practice": [],
                                         'gia': []}
                    for wp_in_fs in change_block.zuns_for_cb.all():
                        if (wp_in_fs.work_program.id not in unique_wp) or first_ap_iter:
                            change_block_dict['work_program'].append(
                                {"id": wp_in_fs.work_program.id, "title": wp_in_fs.work_program.title,
                                 "competences": get_competences_wp(wp_in_fs)})
                            unique_wp.append(wp_in_fs.work_program.id)
                        else:
                            pass
                            # print(work_program)
                    for practice_in_fs in change_block.zuns_for_cb_for_practice.all():
                        if (practice_in_fs.practice.id not in unique_practice) or first_ap_iter:
                            change_block_dict['practice'].append(
                                {"id": practice_in_fs.practice.id, "title": practice_in_fs.practice.title,
                                 "competences": get_competences_practice(practice_in_fs)})
                            unique_practice.append(practice_in_fs.practice.id)
                        else:
                            pass
                            # print(work_program)
                    if change_block_dict["work_program"] or change_block_dict["practice"]:
                        block_module_dict["change_blocks_of_work_programs_in_modules"].append(change_block_dict)
                if block_module_dict["change_blocks_of_work_programs_in_modules"] or block_module_dict["childs"]:
                    block_dict["modules_in_discipline_block"].append(block_module_dict)
            if block_dict["modules_in_discipline_block"]:
                academic_plan_matrix_dict["discipline_blocks_in_academic_plan"].append(block_dict)
        list_to_sort = academic_plan_matrix_dict["discipline_blocks_in_academic_plan"]
        newlist = sorted(list_to_sort, key=lambda d: d['name'])
        academic_plan_matrix_dict["discipline_blocks_in_academic_plan"] = newlist
        first_ap_iter = False
    competence_matrix["wp_matrix"] = matrix_list
    competence_matrix["educational_program"] = ImplementationAcademicPlanForCompsSSerializer(
        academic_plans, many=True).data
    # print(matrix_list)
    return Response(competence_matrix)
