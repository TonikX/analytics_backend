import time

from apscheduler.schedulers.background import BackgroundScheduler
import datetime
from workprogramsapp.isu_merge.academic_plan_update_2023.academic_plan_update_processor import AcademicPlanUpdateProcessor
from workprogramsapp.models import AcademicPlanUpdateSchedulerConfiguration


class AcademicPlanUpdateScheduler:

    def __init__(self):
        self.scheduler = BackgroundScheduler()
        self.update_processor = AcademicPlanUpdateProcessor()
        self.interval = 1

    def start_job(self):
        self.scheduler.add_job(
            self.invoke_update_plans_job,
            'interval',
            hours=self.interval
        )
        try:
            self.scheduler.start()
        except:
            pass

    @staticmethod
    def job_allowed(configuration, now):
        return configuration.execution_hours == now.hour \
               and configuration.updated_timestamp is None \
               or (now - datetime.datetime.fromtimestamp(configuration.updated_timestamp)).days >= configuration.days_interval

    def invoke_update_plans_job(self):
        queryset = AcademicPlanUpdateSchedulerConfiguration.objects.all()
        if len(queryset) > 0:
            configuration = queryset[0]
            now = datetime.datetime.now()
            if self.job_allowed(configuration, now):
                self.update_processor.update_academic_plans()
                configuration.updated_timestamp = int(time.time())
                configuration.save()
