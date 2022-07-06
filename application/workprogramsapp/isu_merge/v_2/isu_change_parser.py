import json
import re
from ast import literal_eval
from pprint import pprint
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from workprogramsapp.models import WorkProgramIdStrUpForIsu, FieldOfStudy, WorkProgram, AcademicPlan, \
    ImplementationAcademicPlan, DisciplineBlock, DisciplineBlockModule, WorkProgramChangeInDisciplineBlockModule, \
    WorkProgramInFieldOfStudy, Zun

# import jsondiff
from deepdiff import DeepDiff

import pandas as pd


@api_view(['GET', 'POST'])
def ChangeParser(request):
    iap = 4024

    change = ImplementationAcademicPlan.objects.get(id=iap).old_json
    orig = ImplementationAcademicPlan.objects.get(id=iap).new_json

    def str_diff_parse(str_diff):
        return [tuple(literal_eval(y) for y in re.findall(r"\[('?\w+'?)\]", x)) for x in str_diff]

    result = pd.DataFrame(DeepDiff(orig, change)['values_changed'])  # ignore_order=True, report_repetition=True, view='tree')
    print(result)
    # print('1111', str_diff_parse(result["values_changed"]))

    # for removed in result['iterable_item_added']:
    #     print('1', removed)
    # print('to json', DeepDiff(orig, change).to_json())
    for added in result:
        print(added, ' ', result[added][1])

        for block_from_json in orig[added.up.up.path()[4:].replace('\'', '\"')]:
        #for block_from_json in orig["result"]["disciplines_blocks"]:
            if DisciplineBlock.objects.filter(name=orig["result"]["disciplines_blocks"][0]["block_name"], academic_plan__academic_plan_in_field_of_study__id = iap).exists():
                print('sss')
                block_in_db = DisciplineBlock.objects.get(name=orig["result"]["disciplines_blocks"][0]["block_name"], academic_plan__academic_plan_in_field_of_study__id = iap)
                block_in_db.name = change["result"]["disciplines_blocks"][0]["block_name"]
                block_in_db.save()
                print(block_in_db.name)
            else:
                DisciplineBlock.objects.create(name=orig["result"]["disciplines_blocks"][0]["block_name"],
                                               academic_plan = AcademicPlan.objects.get(academic_plan_in_field_of_study__id = iap))


    return Response(status=200)
