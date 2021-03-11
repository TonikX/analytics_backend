from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.response import Response

from workprogramsapp.bars_merge.bars_api_getter import get_educational_program_main, get_disciplines
from workprogramsapp.bars_merge.models import BarsEPAssociate, BarsWorkProgramsAssociate
from workprogramsapp.bars_merge.serializers import BarsEPAssociateSerializer, BarsWorkProgramsAssociateSerializer
from workprogramsapp.models import WorkProgram, FieldOfStudy, ImplementationAcademicPlan, EvaluationTool


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def FindSimilarEP(request):
    # Достаем из АПИ БАРС 2.0 Все ОП
    ep = get_educational_program_main()
    list_of_new_bars_ep = []

    # Проходимся по полученным ОП
    for program in ep:
        # Если такой ОП нету в нашем сервисе, создаем новую
        if not BarsEPAssociate.objects.filter(bars_id=program["id"]):
            try:
                field_of_study = list(ImplementationAcademicPlan.objects.filter(
                    field_of_study__number=program["code"][:program["code"].rfind(".")]))
                new_bars_ep = BarsEPAssociate(bars_id=program["id"])
                new_bars_ep.save()
                new_bars_ep.base_field_of_study.add(*field_of_study)
                list_of_new_bars_ep.append(new_bars_ep)
            except FieldOfStudy.DoesNotExist:
                pass
    serializer = BarsEPAssociateSerializer(list_of_new_bars_ep, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def FindSimilarWP(request):
    # Достаем из АПИ БАРС 2.0 Все РПД
    wp = get_disciplines()
    wp_db = []
    for program in wp:
        if not BarsWorkProgramsAssociate.objects.filter(bars_id=program["id"]):
            wp_to_append = list(WorkProgram.objects.filter(title=program["name"]))
            if wp_to_append:
                wp_object = BarsWorkProgramsAssociate(bars_id=program["id"], term=program["term"])
                wp_object.save()
                wp_object.base_work_programs.add(*wp_to_append)
                wp_db.append(wp_object)
    serializer = BarsWorkProgramsAssociateSerializer(wp_db, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((AllowAny,))
def CreateCheckPoint(request):
    work_program_id = request.data.get('work_program_id')
    term = request.data.get('term')
    implementation_ap_id = request.data.get('implementation_ap_id')
    bars_id = BarsWorkProgramsAssociate.objects.get(base_work_programs=work_program_id, term=term).bars_id
    ep_id = BarsEPAssociate.objects.get(base_field_of_study=implementation_ap_id).bars_id
    evaluation_tools=EvaluationTool.objects.filter(evaluation_tool_of_outcomes__workprogram=work_program_id)
    print(evaluation_tools)
    return Response("Гусары, МОЛЧАТЬ!")
