from dataprocessing.models import Items
from gia_practice_app.GIA.models import GIA
from gia_practice_app.GIA.serializers import GIAPrimitiveSerializer, GIASmallSerializer
from gia_practice_app.Practice.models import Practice, ZunPractice
from gia_practice_app.Practice.serializers import PracticeCompetenceSerializer, PracticeInFieldOfStudyCreateSerializer
from workprogramsapp.educational_program.serializers import WorkProgramCompetenceIndicatorSerializer
from workprogramsapp.models import WorkProgramChangeInDisciplineBlockModule, WorkProgram, Competence, Zun, Indicator, \
    WorkProgramInFieldOfStudy, ImplementationAcademicPlan, PracticeInFieldOfStudy
from workprogramsapp.serializers import IndicatorSerializer, WorkProgramInFieldOfStudySerializerForCb, \
    ImplementationAcademicPlanSerializer


def get_competences_practice(practice_in_fs):
    competences = Competence.objects.filter(
        indicator_in_competencse__zun_practice__practice_in_fs=practice_in_fs).distinct()
    competences_dict = []
    for competence in competences:
        zuns = ZunPractice.objects.filter(practice_in_fs=practice_in_fs,
                                          indicator_in_zun__competence__id=competence.id)
        zuns_array = []
        for zun in zuns:
            try:
                indicator = Indicator.objects.get(competence=competence.id,
                                                  zun_practice__id=zun.id)
                indicator = IndicatorSerializer(indicator).data
            except:
                indicator = None
            # indicators_array = []
            # for indicator in indicators:
            #     indicators_array.append({"id": indicator.id, "name": indicator.name, "number": indicator.number})
            items_array = []
            items = Items.objects.filter(practice_item_in_outcomes__item_in_practice__id=zun.id,
                                         practice_item_in_outcomes__item_in_practice__practice_in_fs=practice_in_fs,
                                         practice_item_in_outcomes__item_in_practice__indicator_in_zun__competence__id=competence.id)
            for item in items:
                items_array.append({"id": item.id, "name": item.name})
            # serializer = WorkProgramInFieldOfStudySerializerForCb(WorkProgramInFieldOfStudy.objects.get(zun_in_wp = zun.id))
            zuns_array.append({"id": zun.id, "indicator": indicator,
                               "wp_in_fs": PracticeInFieldOfStudyCreateSerializer(
                                   PracticeInFieldOfStudy.objects.get(zun_in_practice=zun.id)).data["id"]})
        competences_dict.append({"id": competence.id, "name": competence.name, "number": competence.number,
                                 "zuns": zuns_array})
    return {"competences": competences_dict}


def get_competences_wp(wp_in_fs):
    competences = Competence.objects.filter(
        indicator_in_competencse__zun__wp_in_fs=wp_in_fs).distinct()
    competences_dict = []
    for competence in competences:
        zuns = Zun.objects.filter(wp_in_fs=wp_in_fs,
                                  indicator_in_zun__competence__id=competence.id)
        zuns_array = []
        for zun in zuns:
            try:
                indicator = Indicator.objects.get(competence=competence.id,
                                                  zun__id=zun.id)
                indicator = IndicatorSerializer(indicator).data
            except:
                indicator = None
            # indicators_array = []
            # for indicator in indicators:
            #     indicators_array.append({"id": indicator.id, "name": indicator.name, "number": indicator.number})
            # serializer = WorkProgramInFieldOfStudySerializerForCb(WorkProgramInFieldOfStudy.objects.get(zun_in_wp = zun.id))

            zuns_array.append({"id": zun.id,
                                "indicator": indicator,
                               "wp_in_fs": WorkProgramInFieldOfStudySerializerForCb(
                                   WorkProgramInFieldOfStudy.objects.get(zun_in_wp=zun.id)).data["id"]})
        competences_dict.append({"id": competence.id, "name": competence.name, "number": competence.number,
                                 "zuns": zuns_array})
    return {"competences": competences_dict}


def recursion_module_matrix(block_module, unique_wp, unique_gia, unique_practice, first_ap_iter):
    block_module_dict = {"name": block_module.name, "type": block_module.type,
                         "change_blocks_of_work_programs_in_modules": [], "childs": []}
    # block_dict["modules_in_discipline_block"].append(block_module_dict)
    childs = block_module.childs.prefetch_related("change_blocks_of_work_programs_in_modules", "childs")
    if childs.exists():
        for child in childs:
            lower_module = recursion_module_matrix(child, unique_wp, unique_gia, unique_practice, first_ap_iter)
            if lower_module["change_blocks_of_work_programs_in_modules"] or lower_module["childs"]:
                block_module_dict["childs"].append(lower_module)
    for change_block in block_module.change_blocks_of_work_programs_in_modules.prefetch_related("work_program", "practice", "gia"):
        change_block_dict = {"change_type": change_block.change_type,
                             "credit_units": change_block.credit_units, "work_program": [], "practice": [], 'gia': []}
        # block_module_dict["change_blocks_of_work_programs_in_modules"].append(change_block_dict)
        for work_program in change_block.work_program.all():
            if (work_program.id not in unique_wp) or first_ap_iter:
                wp_in_fs = WorkProgramInFieldOfStudy.objects.get(work_program=work_program,
                                                                 work_program_change_in_discipline_block_module=change_block)
                change_block_dict['work_program'].append(
                    {"id": work_program.id, "title": work_program.title, "competences": get_competences_wp(wp_in_fs)})
                unique_wp.append(work_program.id)
            else:
                pass
                # print(work_program)
        for practice in change_block.practice.all():
            if (practice.id not in unique_practice) or first_ap_iter:
                practice_in_fs = PracticeInFieldOfStudy.objects.get(practice=practice,
                                                                    work_program_change_in_discipline_block_module=change_block)
                change_block_dict['practice'].append(
                    {"id": practice.id, "title": practice.title,
                     "competences": get_competences_practice(practice_in_fs)})
                unique_practice.append(practice.id)
            else:
                pass
                # print(work_program)
        for gia in change_block.gia.all():
            if (gia.id not in unique_gia) or first_ap_iter:
                serializer = GIASmallSerializer(gia)
                change_block_dict['gia'].append(serializer.data)
                unique_gia.append(gia.id)
            else:
                pass
                # print(work_program)

        if change_block_dict["work_program"] or change_block_dict["practice"] or change_block_dict["gia"]:
            block_module_dict["change_blocks_of_work_programs_in_modules"].append(change_block_dict)
    return block_module_dict
