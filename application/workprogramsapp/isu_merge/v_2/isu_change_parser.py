import re
from ast import literal_eval

import pandas as pd
from deepdiff import DeepDiff
from drf_spectacular.utils import extend_schema
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from workprogramsapp.models import (
    AcademicPlan,
    DisciplineBlock,
    ImplementationAcademicPlan,
)


@extend_schema(request=None, responses=None)
@api_view(["GET", "POST"])
def ChangeParser(request: Request) -> Response:
    iap = 4024

    change = ImplementationAcademicPlan.objects.get(id=iap).old_json
    orig = ImplementationAcademicPlan.objects.get(id=iap).new_json

    def str_diff_parse(str_diff):
        return [
            tuple(literal_eval(y) for y in re.findall(r"\[('?\w+'?)\]", x))
            for x in str_diff
        ]

    result = pd.DataFrame(DeepDiff(orig, change)["values_changed"])
    for added in result:
        for block_from_json in orig[added.up.up.path()[4:].replace("'", '"')]:
            if DisciplineBlock.objects.filter(
                name=orig["result"]["disciplines_blocks"][0]["block_name"],
                academic_plan__academic_plan_in_field_of_study__id=iap,
            ).exists():
                block_in_db = DisciplineBlock.objects.get(
                    name=orig["result"]["disciplines_blocks"][0]["block_name"],
                    academic_plan__academic_plan_in_field_of_study__id=iap,
                )
                block_in_db.name = change["result"]["disciplines_blocks"][0][
                    "block_name"
                ]
                block_in_db.save()
            else:
                DisciplineBlock.objects.create(
                    name=orig["result"]["disciplines_blocks"][0]["block_name"],
                    academic_plan=AcademicPlan.objects.get(
                        academic_plan_in_field_of_study__id=iap
                    ),
                )

    return Response(status=200)
