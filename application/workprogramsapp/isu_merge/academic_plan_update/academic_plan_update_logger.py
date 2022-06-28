from enum import Enum

from workprogramsapp.models import AcademicPlanUpdateLog
from django.utils import timezone


class AcademicPlanUpdateLogger:
    class LoggedObjectType(Enum):
        IMPLEMENTATION_ACADEMIC_PLAN = 1
        WORK_PROGRAM = 2
        FIELD_OF_STUDY = 3
        DISCIPLINE_BLOCK = 4
        DISCIPLINE_BLOCK_MODULE = 5
        WORK_PROGRAM_CHANGE_IN_DISCIPLINE_BLOCK_MODULE = 6
        WORK_PROGRAM_IN_FIELD_OF_STUDY = 7
        WORK_PROGRAM_ID_STR_UP_FOR_ISU = 8

    @staticmethod
    def log_changes(academic_plan_id, object_type, old_object, updated_object):
        if old_object is None:
            updated_date_time = timezone.now()
            log = AcademicPlanUpdateLog(
                object_type=object_type.value,
                academic_plan_id=academic_plan_id,
                field_name=updated_object.__class__.__name__,
                new_value=updated_object.id,
                updated_date_time=updated_date_time
            )
            log.save()
        for attr, value in updated_object.__dict__.items():
            if attr != "_state" and (old_object is None or old_object.__dict__[attr] != value):
                updated_date_time = timezone.now()
                if old_object is None:
                    log = AcademicPlanUpdateLog(
                        object_type=object_type.value,
                        academic_plan_id=academic_plan_id,
                        field_name=attr,
                        new_value=value,
                        updated_date_time=updated_date_time
                    )
                else:
                    log = AcademicPlanUpdateLog(
                        object_type=object_type.value,
                        academic_plan_id=academic_plan_id,
                        field_name=attr,
                        old_value=old_object.__dict__[attr],
                        new_value=value,
                        updated_date_time=updated_date_time
                    )
                    log.save()
