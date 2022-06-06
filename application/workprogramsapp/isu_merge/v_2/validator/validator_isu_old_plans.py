from .models import ValidationRunResult, AcademicPlanValidationResult
from .validator_base import ValidatorBase
import re
import os
from workprogramsapp.models import ImplementationAcademicPlan

class ValidatorISUOldPlans(ValidatorBase):
    def __init__(self):
        super().__init__()
        super().read_ids('input.txt')
        
    def process(self, validation_run_result):
        self.report_service.createISUOldPlansReports()

        for id in self.ids:
            academic_plan = self.isu_service.get_academic_plan(id)
            validation_result = self.validate(academic_plan)
            constructor_academic_plan = ImplementationAcademicPlan.objects.get(ap_isu_id=academic_plan['id'])
            academic_plan_validation_result = AcademicPlanValidationResult.objects.create(validation_run_result=validation_run_result,
                                                        implementation_of_academic_plan=constructor_academic_plan)
            if True in validation_result.values():
                if validation_result['blocks']:
                    academic_plan_validation_result.has_blocks_error = True
                if validation_result['hours']:
                    academic_plan_validation_result.has_hours_error = True
                if validation_result['specialization']:
                    academic_plan_validation_result.has_specialization_error = True
                if validation_result['ognp']:
                    academic_plan_validation_result.has_ognp_error = True
                if validation_result['format']:
                    academic_plan_validation_result.has_format_error = True
                academic_plan_validation_result.save()
                self.errors_count += 1
                self.create_conversation(academic_plan['id'], academic_plan['faculty_id'], constructor_academic_plan)

        self.report_service.saveISUOldPlansReports()
        validation_run_result.invalid_plans_count = validation_run_result.invalid_plans_count + self.errors_count
        validation_run_result.save()

    def validate(self, academic_plan):
        errors = {
            "blocks": False,
            "hours": False,
            "specialization": False,
            "ognp": False,
            "format": False,
        }

        total_intensity = int(re.findall(r'\d+', academic_plan['total_intensity'])[0])
        sum_ze = 0

        if not self.validate_blocks(academic_plan):
            errors["blocks"] = True
            row = [academic_plan["id"], academic_plan["direction_name"], academic_plan["selection_year"],
                    len(academic_plan['disciplines_blocks'])]
            self.report_service.appendToBlocksReport(row)

        for discipline_block in academic_plan['disciplines_blocks']:
            sum_ze += self.calculate_block_hours(discipline_block, errors, academic_plan["id"],
                                         academic_plan["direction_name"], academic_plan["selection_year"])

        if sum_ze != total_intensity:
            errors["hours"] = True
            row = [academic_plan["id"], academic_plan["direction_name"], academic_plan["selection_year"],
                    total_intensity, sum_ze]
            self.report_service.appendToHoursReport(row)
        print(academic_plan["id"], errors)
        return errors

    def calculate_block_hours(self, discipline_block, errors, id, direction_name, selection_year):
        sum_block = 0
        if "Факультативные модули" in discipline_block['block_name']:
            return sum_block

        ognp_ze = []
        specialization_ze = []
        for module in discipline_block['discipline_modules']:
            orders_taken = []
            block_ze = {}
            module_ze = 0
            for discipline in module['disciplines']:
                has_format_error = False
                for class_point in discipline['class_points']:
                    if 'Online' not in discipline['format_name']:
                        if class_point['consultation'] is not None:
                            has_format_error = True
                    elif class_point['lesson'] is not None or class_point['practice'] is not None or class_point[
                        'lab'] is not None:
                        has_format_error = True

                if has_format_error:
                    errors["format"] = True
                    row = [id, direction_name, selection_year, discipline['discipline_name']]
                    self.report_service.appendToFormatReport(row)

                if 'ОГНП' in module['module_name']:
                    temp = 0
                    for ze in discipline['ze']:
                        if ze['points'] is not None:
                            temp += ze['points']

                    found_ze = False
                    for x in ognp_ze:
                        if x["name"] == module['module_name']:
                            x["value"] += temp
                            found_ze = True
                            break
                    if not found_ze:
                        ognp_ze.append({"name": module['module_name'], "value": temp})
                    # previous_ognp = module['module_name']
                elif not discipline['is_optional']:
                    for ze in discipline['ze']:
                        if ze['points'] is not None:
                            module_ze += ze['points']
                else:
                    if discipline['plan_order'] not in orders_taken:
                        orders_taken.append(discipline['plan_order'])
                        block_ze[discipline['plan_order']] = []
                        for ze in discipline['ze']:
                            if ze['points'] is not None:
                                module_ze += ze['points']

                    block_ze[discipline['plan_order']].append(discipline['ze'])

            if 'Специализация' in module['module_name']:
                specialization_ze.append({"name": module['module_name'], "value": module_ze})
                if len(specialization_ze) == 1:
                    sum_block += module_ze
            else:
                sum_block += module_ze

        if len(ognp_ze) > 0:
            ognp_value = ognp_ze[0]["value"]
            for ognp in ognp_ze:
                if ognp["value"] != ognp_value:
                    errors["ognp"] = True
                    row1 = [id, direction_name, selection_year]
                    row2 = ["", "", ""]
                    for ognp_sorted in sorted(ognp_ze, key=lambda d: d['name']):
                        row1.append(ognp_sorted["name"])
                        row2.append(ognp_sorted["value"])

                    self.report_service.appendToOgnpReport(row1)
                    self.report_service.appendToOgnpReport(row2)
                    break

        if len(specialization_ze) > 0:
            specialization_value = specialization_ze[0]["value"]
            for specialization in specialization_ze:
                if specialization["value"] != specialization_value:
                    errors["specialization"] = True
                    row1 = [id, direction_name, selection_year]
                    row2 = ["", "", ""]
                    for specialization_sorted in sorted(specialization_ze, key=lambda d: d['name']):
                        row1.append(specialization_sorted["name"])
                        row2.append(specialization_sorted["value"])

                    self.report_service.appendToSpecializationReport(row1)
                    self.report_service.appendToSpecializationReport(row2)
                    break

        if len(ognp_ze) > 0:
            sum_block += ognp_ze[0]["value"]

        return sum_block