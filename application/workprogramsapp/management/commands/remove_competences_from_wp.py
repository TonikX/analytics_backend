from django.core.management import BaseCommand

from workprogramsapp.models import Zun


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument("wp_id", nargs="+", type=int)

    def handle(self, *args, **kwargs):
        items = Zun.objects.filter(wp_in_fs__work_program__id=kwargs["wp_id"][0])
        items.delete()
