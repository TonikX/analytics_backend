import copy

from workprogramsapp.isu_merge.academic_plan_update.academic_plan_update_logger import (
    AcademicPlanUpdateLogger,
)
from workprogramsapp.isu_merge.academic_plan_update.academic_plan_update_utils import (
    AcademicPlanUpdateUtils,
)
from workprogramsapp.models import (
    DisciplineBlock,
    DisciplineBlockModule,
    FieldOfStudy,
    ImplementationAcademicPlan,
    WorkProgram,
    WorkProgramIdStrUpForIsu,
)


class AcademicPlanUpdateAspect:

    @staticmethod
    def discipline_difference_aspect(func):
        def wrapper(*args, **kwargs):
            result = func(*args, **kwargs)
            # todo log deleted ids
            return result

        return wrapper

    @staticmethod
    def field_of_study_changes_aspect(func):
        def wrapper(*args, **kwargs):
            isu_academic_plan_json = args[0]
            print(isu_academic_plan_json)
            if FieldOfStudy.objects.filter(
                number=isu_academic_plan_json["direction_code"],
                title=isu_academic_plan_json["direction_name"],
                qualification=AcademicPlanUpdateUtils.get_qualification(
                    isu_academic_plan_json
                ),
            ).exists():
                old_field_of_study_object = FieldOfStudy.objects.get(
                    number=isu_academic_plan_json["direction_code"],
                    title=isu_academic_plan_json["direction_name"],
                    qualification=AcademicPlanUpdateUtils.get_qualification(
                        isu_academic_plan_json
                    ),
                )
            else:
                old_field_of_study_object = None

            updated_field_of_study_object = func(
                copy.deepcopy(old_field_of_study_object), *args, **kwargs
            )

            AcademicPlanUpdateLogger.log_changes(
                isu_academic_plan_json["id"],
                AcademicPlanUpdateLogger.LoggedObjectType.FIELD_OF_STUDY,
                old_field_of_study_object,
                updated_field_of_study_object,
            )

            return updated_field_of_study_object

        return wrapper

    @staticmethod
    def academic_plan_changes_aspect(func):
        def wrapper(*args, **kwargs):
            isu_academic_plan_json = args[0]

            if ImplementationAcademicPlan.objects.filter(
                title=isu_academic_plan_json["edu_program_name"],
                ap_isu_id=int(isu_academic_plan_json["id"]),
                year=isu_academic_plan_json["selection_year"],
                language=AcademicPlanUpdateUtils.get_op_language(
                    isu_academic_plan_json
                ),
                qualification=AcademicPlanUpdateUtils.get_qualification(
                    isu_academic_plan_json
                ),
            ).exists():
                old_implementation_academic_plan_object = (
                    ImplementationAcademicPlan.objects.filter(
                        title=isu_academic_plan_json["edu_program_name"],
                        ap_isu_id=int(isu_academic_plan_json["id"]),
                        year=isu_academic_plan_json["selection_year"],
                        qualification=AcademicPlanUpdateUtils.get_qualification(
                            isu_academic_plan_json
                        ),
                    )[0]
                )
            else:
                old_implementation_academic_plan_object = None

            (
                updated_academic_plan_object,
                updated_implementation_academic_plan_object,
            ) = func(
                copy.deepcopy(old_implementation_academic_plan_object), *args, **kwargs
            )

            AcademicPlanUpdateLogger.log_changes(
                isu_academic_plan_json["id"],
                AcademicPlanUpdateLogger.LoggedObjectType.IMPLEMENTATION_ACADEMIC_PLAN,
                old_implementation_academic_plan_object,
                updated_implementation_academic_plan_object,
            )

            return updated_academic_plan_object

        return wrapper

    @staticmethod
    def discipline_block_changes_aspect(func):
        def wrapper(*args, **kwargs):
            (
                isu_academic_plan_block_json,
                academic_plan_object,
                isu_academic_plan_json,
            ) = args

            if DisciplineBlock.objects.filter(
                name=isu_academic_plan_block_json["block_name"],
                academic_plan=academic_plan_object,
            ).exists():
                old_discipline_block_object = DisciplineBlock.objects.get(
                    name=isu_academic_plan_block_json["block_name"],
                    academic_plan=academic_plan_object,
                )
            else:
                old_discipline_block_object = None

            updated_discipline_block_object = func(
                copy.deepcopy(old_discipline_block_object), *args, **kwargs
            )

            AcademicPlanUpdateLogger.log_changes(
                isu_academic_plan_json["id"],
                AcademicPlanUpdateLogger.LoggedObjectType.DISCIPLINE_BLOCK,
                old_discipline_block_object,
                updated_discipline_block_object,
            )

            return updated_discipline_block_object

        return wrapper

    @staticmethod
    def discipline_block_module_changes_aspect(func):
        def wrapper(*args, **kwargs):
            (
                isu_academic_plan_block_module_json,
                discipline_block_object,
                isu_academic_plan_json,
            ) = args
            # print(isu_academic_plan_block_module_json)
            if DisciplineBlockModule.objects.filter(
                name=isu_academic_plan_block_module_json["module_name"],
                module_isu_id=isu_academic_plan_block_module_json["module_id "],
                descipline_block=discipline_block_object,
            ).exists():
                old_discipline_block_module_object = (
                    DisciplineBlockModule.objects.filter(
                        name=isu_academic_plan_block_module_json["module_name"],
                        module_isu_id=isu_academic_plan_block_module_json["module_id "],
                        descipline_block=discipline_block_object,
                    )[0]
                )
            else:
                old_discipline_block_module_object = None
            # print('old_discipline_block_module_object',  old_discipline_block_module_object)
            updated_discipline_block_module_object = func(
                copy.deepcopy(old_discipline_block_module_object), *args, **kwargs
            )

            AcademicPlanUpdateLogger.log_changes(
                isu_academic_plan_json["id"],
                AcademicPlanUpdateLogger.LoggedObjectType.DISCIPLINE_BLOCK_MODULE,
                old_discipline_block_module_object,
                updated_discipline_block_module_object,
            )

            return updated_discipline_block_module_object

        return wrapper

    @staticmethod
    def discipline_changes_aspect(func):
        def wrapper(*args, **kwargs):
            isu_academic_plan_discipline_json = args[1]
            isu_academic_plan_json = args[0]

            # todo get() returned more than one WorkProgram -- it returned 11!
            if WorkProgram.objects.filter(
                discipline_code=str(isu_academic_plan_discipline_json["disc_id"])
            ).exists():
                old_work_program_object = WorkProgram.objects.filter(
                    discipline_code=str(isu_academic_plan_discipline_json["disc_id"])
                )[0]
            else:
                old_work_program_object = None

            updated_work_program_object = func(old_work_program_object, *args, **kwargs)

            AcademicPlanUpdateLogger.log_changes(
                isu_academic_plan_json["id"],
                AcademicPlanUpdateLogger.LoggedObjectType.WORK_PROGRAM,
                old_work_program_object,
                updated_work_program_object,
            )

            return updated_work_program_object

        return wrapper

    @staticmethod
    def linked_data_changes_aspect(func):
        def wrapper(*args, **kwargs):
            isu_academic_plan_json = args[3]
            (
                old_work_program_change_in_discipline_block_module_object,
                old_work_program_in_field_of_study_object,
                updated_work_program_change_in_discipline_block_module_object,
                updated_work_program_in_field_of_study_object,
            ) = func(*args, **kwargs)

            AcademicPlanUpdateLogger.log_changes(
                isu_academic_plan_json["id"],
                AcademicPlanUpdateLogger.LoggedObjectType.WORK_PROGRAM_CHANGE_IN_DISCIPLINE_BLOCK_MODULE,
                old_work_program_change_in_discipline_block_module_object,
                updated_work_program_change_in_discipline_block_module_object,
            )

            AcademicPlanUpdateLogger.log_changes(
                isu_academic_plan_json["id"],
                AcademicPlanUpdateLogger.LoggedObjectType.WORK_PROGRAM_IN_FIELD_OF_STUDY,
                old_work_program_in_field_of_study_object,
                updated_work_program_in_field_of_study_object,
            )

            return (
                updated_work_program_in_field_of_study_object,
                updated_work_program_change_in_discipline_block_module_object,
            )

        return wrapper

    @staticmethod
    def work_program_id_str_up_for_isu_changes_aspect(func):
        def wrapper(*args, **kwargs):
            (
                work_program_in_field_of_study_object,
                isu_academic_plan_json,
                isu_academic_plan_discipline_json,
            ) = args

            if WorkProgramIdStrUpForIsu.objects.filter(
                id_str_up=int(isu_academic_plan_discipline_json["str_up_id"]),
                ns_id=int(isu_academic_plan_json["ns_id"]),
                work_program_in_field_of_study=work_program_in_field_of_study_object,
            ).exists():
                old_work_program_id_str_up_for_isu_object = WorkProgramIdStrUpForIsu.objects.get(
                    id_str_up=int(isu_academic_plan_discipline_json["str_up_id"]),
                    ns_id=int(isu_academic_plan_json["ns_id"]),
                    work_program_in_field_of_study=work_program_in_field_of_study_object,
                )
            else:
                old_work_program_id_str_up_for_isu_object = None

            updated_work_program_id_str_up_for_isu_object = func(
                copy.deepcopy(old_work_program_id_str_up_for_isu_object),
                *args,
                **kwargs
            )

            AcademicPlanUpdateLogger.log_changes(
                isu_academic_plan_json["id"],
                AcademicPlanUpdateLogger.LoggedObjectType.WORK_PROGRAM_ID_STR_UP_FOR_ISU,
                old_work_program_id_str_up_for_isu_object,
                updated_work_program_id_str_up_for_isu_object,
            )

            return updated_work_program_id_str_up_for_isu_object

        return wrapper
