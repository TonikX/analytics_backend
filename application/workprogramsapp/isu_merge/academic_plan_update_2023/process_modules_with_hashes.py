from django.db.models import Count

from analytics_project import settings
from workprogramsapp.isu_merge.academic_plan_update.isu_service import IsuUser
from workprogramsapp.isu_merge.academic_plan_update_2023.isu_service import IsuService
from workprogramsapp.models import AcademicPlanUpdateConfiguration, ImplementationAcademicPlan, IsuModulesHashes
import zlib


def get_ap_jsons():
    academic_plans_ids = AcademicPlanUpdateConfiguration.objects.filter(updates_enabled=True, over_23=True).values_list(
        'academic_plan_id', flat=True)
    isu_service = IsuService(
        IsuUser(
            settings.ISU["ISU_CLIENT_ID"],
            settings.ISU["ISU_CLIENT_SECRET"]
        )
    )
    IsuModulesHashes.objects.all().delete()
    plans = []
    for plan_id in academic_plans_ids:
        plan_id = str(plan_id)
        old_academic_plan = ImplementationAcademicPlan.objects.get(ap_isu_id=plan_id)
        isu_academic_plan_json = isu_service.get_academic_plan_only_modules(plan_id)
        old_academic_plan.isu_modified_plan = isu_academic_plan_json
        old_academic_plan.save()
        plans.append(old_academic_plan)

        for block in isu_academic_plan_json["structure"]:
            process_json_recursion(block["children"], old_academic_plan)

    id_diff_hashes = get_id_with_diff_hashes()

    for hash_obj in IsuModulesHashes.objects.filter(new_id__isnull=False):
        old_academic_plan = ImplementationAcademicPlan.objects.get(ap_isu_id=hash_obj.ap_isu_id)
        isu_academic_plan_json = old_academic_plan.isu_modified_plan
        for block in isu_academic_plan_json["structure"]:
            process_editing_json(block["children"], hash_obj)
        old_academic_plan.isu_modified_plan = isu_academic_plan_json
        old_academic_plan.save()


def process_json_recursion(modules_json, ap):
    list_for_hashing = []
    for object_module in modules_json:
        if object_module["type"] == "module":
            hash_module = process_json_recursion(object_module["children"], ap)
            list_for_hashing.append(hash_module)
            IsuModulesHashes.objects.create(academic_plan=ap, ap_isu_id=ap.ap_isu_id, isu_id=object_module["id"],
                                            module_hash=hash_module)
        else:
            id_obj = object_module["id"]
            list_of_start_sem = sorted(list(object_module["contents"].keys()))
            list_for_hashing.append(str(id_obj) + str(list_of_start_sem))
    return zlib.crc32(bytes(str(sorted(list_for_hashing)).encode()))


# IsuModulesHashes.objects.values('isu_id').annotate(Count('id')).order_by().filter(id__count__gt=1)

def process_editing_json(modules_json, hash_obj,):
    for object_module in modules_json:
        if object_module["type"] == "module":
            if object_module["id"] == hash_obj.isu_id:
                object_module["new_id"] = hash_obj.new_id
            process_editing_json(object_module["children"], hash_obj)


def get_id_with_diff_hashes():
    ids = IsuModulesHashes.objects.values('isu_id').annotate(Count('module_hash', distinct=True)).order_by().filter(
        module_hash__count__gt=1)
    unique_hashes = {}
    for hash_obj_aggregate in ids:
        save_hash = IsuModulesHashes.objects.filter(isu_id=hash_obj_aggregate["isu_id"]).values("module_hash").annotate(
            Count("id")).latest('id__count')["module_hash"]
        unique_hashes[save_hash] = str(hash_obj_aggregate["isu_id"])
        for hash_obj in IsuModulesHashes.objects.filter(isu_id=hash_obj_aggregate["isu_id"]):
            if unique_hashes.get(hash_obj.module_hash) is None:
                new_id = str(hash_obj.ap_isu_id) + "_" + str(hash_obj.isu_id)
                hash_obj.new_id = new_id
                unique_hashes[hash_obj.module_hash] = new_id
                hash_obj.save()
            else:
                new_id = unique_hashes.get(hash_obj.module_hash)
                hash_obj.new_id = new_id
                hash_obj.save()

    print(unique_hashes)
    return [query_obj["isu_id"] for query_obj in ids]
