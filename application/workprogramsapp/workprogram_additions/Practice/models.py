from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from analytics_project import settings

import datetime

from workprogramsapp.workprogram_additions.Practice.consts_for_models import *

def current_year():
    return datetime.date.today().year

def max_value_current_year(value):
    return MaxValueValidator(current_year())(value)

