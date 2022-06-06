from .isu_service import UserISU, ISUService
from .validation_report_service import ValidationReportService
from chat.views import add_conversation, send_message_to_conversation
from workprogramsapp.notifications.models import UserNotification
from dataprocessing.models import User
from workprogramsapp.workprogram_additions.models import StructuralUnit, UserStructuralUnit
from .models import ValidationRunResult, AcademicPlanValidationResult, ValidationAcademicPlanChat

class ValidatorBase:
    def __init__(self):
        user = UserISU('rpd-constructor', 'oVrLzGwN8giUEPpBDs82c8OLuzgx2b9L')
        self.isu_service = ISUService(user)
        self.report_service = ValidationReportService()
        self.ids = []
        self.errors_count = 0

    def read_ids(self, file_name):
        self.ids = []
        with open(file_name, encoding='utf-8') as f:
            self.ids = f.read().splitlines()

    def validate_blocks(self, academic_plan):
        return len(academic_plan['disciplines_blocks']) == 4

    def create_conversation(self, academic_plan_id, faculty_id, constructor_academic_plan):
        admin_id = 1377
        message = "В учебном плане " + str(academic_plan_id) + " обнаружены ошибки"
        structural_unit = StructuralUnit.objects.get(isu_id=faculty_id)
        users_structural_unit = UserStructuralUnit.objects.filter(structural_unit=structural_unit)
        user_ids = {user_structural_unit.user_id for user_structural_unit in users_structural_unit}

        if ValidationAcademicPlanChat.objects.filter(implementation_of_academic_plan=constructor_academic_plan).exists():
            validation_academic_plan_chat = ValidationAcademicPlanChat.objects.get(implementation_of_academic_plan=constructor_academic_plan)
            send_message_to_conversation(validation_academic_plan_chat.conversation.id, message, admin_id)
        else:
            conversation = add_conversation(user_ids, "Валидация Учебного плана " + str(academic_plan_id), admin_id)
            validation_academic_plan_chat = ValidationAcademicPlanChat.objects.create(implementation_of_academic_plan=constructor_academic_plan, conversation=conversation)
            validation_academic_plan_chat.save()
            send_message_to_conversation(conversation.id, message, admin_id)

        for user_id in user_ids:
            user = User.objects.get(id=user_id)
            UserNotification.objects.create(user=user, message=message)