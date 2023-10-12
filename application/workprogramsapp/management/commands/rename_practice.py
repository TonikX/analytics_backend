from django.core.management import BaseCommand

from gia_practice_app.Practice.models import Practice


class Command(BaseCommand):
    list_of_names = [{"value": "intro", "label": "Учебная, ознакомительная практика"},
                     {"value": "senior", "label": "Производственная, преддипломная практика"},
                     {"value": "sci-research", "label": "Производственная, научно-исследовательская практика"},
                     {"value": "tech", "label": "Производственная, технологическая практика"},
                     {"value": "prod-tech", "label": "Производственная, производственно-технологическая практика"},
                     {"value": "ind-tech",
                      "label": "Производственная, технологическая (проектно-технологическая) практика"},
                     {"value": "study-tech", "label": "Учебная, учебно-технологическая практика"},
                     {"value": "proj-tech", "label": "Производственная проектно-технологическая практика"},
                     {"value": "prod-senior",
                      "label": "Производственная, преддипломная практика / Pre-graduation Internship"},
                     {"value": "research-internship-en",
                      "label": "Научно-исследовательская работа / Research Internship"},
                     {"value": "research-internship", "label": "Научно-исследовательская работа"},
                     {"value": "prod-prof-internship", "label": "Производственная, профессиональные стажировки"},
                     {"value": "prod-prof-internship-en",
                      "label": "Производственная, профессиональные стажировки / Industrial, Professional Internship"},
                     {"value": "sci-intro", "label": "Научно-исследовательская, ознакомительная практика"},
                     {"value": "study-project", "label": "Учебная, проектная практика"},
                     {"value": "prod-proj", "label": "Производственная, проектная практика"}]

    def handle(self, *args, **options):
        for old_name in self.list_of_names:
            try:
                Practice.objects.filter(title=old_name["value"]).update(title=old_name["label"])
            except Exception as e:
                print(str(e))
