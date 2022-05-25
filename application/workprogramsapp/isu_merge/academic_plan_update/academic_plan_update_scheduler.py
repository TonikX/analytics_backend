from apscheduler.schedulers.background import BackgroundScheduler
from workprogramsapp.isu_merge.academic_plan_update.academic_plan_update_processor import AcademicPlanUpdateProcessor
from workprogramsapp.models import AcademicPlanUpdateConfiguration


class AcademicPlanUpdateScheduler:

    def __init__(self):
        self.scheduler = BackgroundScheduler()
        # todo make executable
        #self.interval = AcademicPlanUpdateConfiguration.objects.get().values_list('update_interval', flat=True)
        self.interval = 1

    def start_job(self):
        self.scheduler.add_job(
            AcademicPlanUpdateProcessor.update_academic_plans(),
            'interval',
            days=self.interval
        )
        try:
            self.scheduler.start()
        except:
            pass
