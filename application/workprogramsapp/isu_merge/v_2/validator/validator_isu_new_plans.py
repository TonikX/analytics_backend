from workprogramsapp.models import ImplementationAcademicPlan

from .models import ValidationRunResult, AcademicPlanValidationResult
from .validator_base import ValidatorBase
import re
import copy


class ValidatorISUNewPlans(ValidatorBase):
    def __init__(self):
        super().__init__()
        self.rules_info = None
        self.modules_info = None
        super().read_ids('input_2022.txt')

    def process(self, validation_run_result):
        self.report_service.createISUNewPlansReports()
        self.modules_info = self.isu_service.get_modules_info()
        self.rules_info = self.isu_service.get_rules_info()

        for id in self.ids:
            academic_plan = self.isu_service.get_academic_plan(id)
            if academic_plan is None:
                continue
            validation_result = self.validate(academic_plan)
            constructor_academic_plan = ImplementationAcademicPlan.objects.get(ap_isu_id=10576)
            academic_plan_validation_result = AcademicPlanValidationResult.objects.create(
                validation_run_result=validation_run_result,
                implementation_of_academic_plan=constructor_academic_plan)
            if True in validation_result.values():
                if validation_result['blocks']:
                    academic_plan_validation_result.has_blocks_error = True
                if validation_result['hours']:
                    academic_plan_validation_result.has_hours_error = True
                if validation_result['format']:
                    academic_plan_validation_result.has_format_error = True
                academic_plan_validation_result.save()
                self.errors_count += 1
                self.create_conversation(10576, 725, constructor_academic_plan)

        self.report_service.saveISUNewPlansReports()
        validation_run_result.invalid_plans_count = validation_run_result.invalid_plans_count + self.errors_count
        validation_run_result.save()
        print("count of errors ", self.errors_count)

    def validate(self, academic_plan):
        errors = {
            "blocks": False,
            "hours": False,
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
        sum = 0
        modules_data_travel = copy.deepcopy(self.modules_info)
        if "Факультативные модули" in discipline_block['block_name']:
            return sum

        modules_sum = {}
        plan_modules = []

        for module in discipline_block['discipline_modules']:
            found_module_data = next((item for item in modules_data_travel if item["id"] == module['module_id ']), False)
            plan_modules.append(found_module_data)

            if found_module_data['params_rules'] == 21:
                continue

            if found_module_data['params_rules'] == 41:
                modules_sum[found_module_data['id']] = int(found_module_data['rules'])
                found_module_data['sum'] = int(found_module_data['rules'])
                continue

            disciplines_taken = 0
            module_ze = 0

            for discipline in module['disciplines']:
                has_format_error = False
                if found_module_data['params_rules'] == 1 and found_module_data['rules'] is not None and\
                        disciplines_taken == int(found_module_data['rules']):
                    break

                disciplines_taken += 1
                for class_point in discipline['class_points']:
                    if 'Online' not in discipline['format_name']:
                        if class_point['consultation'] is not None:
                            has_format_error = True
                    elif class_point['lesson'] is not None or class_point['practice'] is not None or\
                            class_point['lab'] is not None:
                        has_format_error = True

                if has_format_error:
                    errors["format"] = True
                    row = [id, direction_name, selection_year, discipline['discipline_name']]
                    self.report_service.appendToFormatReport(row)

                for ze in discipline['ze']:
                    if ze['points'] is not None:
                        module_ze += ze['points']

            modules_sum[found_module_data['id']] = module_ze
            found_module_data['sum'] = module_ze

        taken_modules = []
        roots = {}

        for module_id in modules_sum.keys():

            found_module_data = next((item for item in modules_data_travel if item["id"] == module_id), False)

            while found_module_data['parent_id'] != 0:
                parent_module_data = next(
                    (item for item in modules_data_travel if item["id"] == found_module_data['parent_id']),
                    False)

                if parent_module_data['params_rules'] == 1:
                    if parent_module_data['rules'] is not None and int(parent_module_data['rules']) > 0:
                        if 'sum' in parent_module_data:
                            parent_module_data['sum'] += modules_sum[module_id]
                            parent_module_data['rules'] = int(parent_module_data['rules']) - 1
                            taken_modules.append(found_module_data['id'])
                        else:
                            taken_modules.append(found_module_data['id'])
                            parent_module_data['rules'] = int(parent_module_data['rules']) - 1
                            parent_module_data['sum'] = found_module_data['sum']
                    else:
                        if found_module_data['id'] in taken_modules:
                            parent_module_data['sum'] += modules_sum[module_id]
                        else:
                            break
                elif parent_module_data['params_rules'] == 2:
                    if 'sum' in parent_module_data:
                        parent_module_data['sum'] += modules_sum[module_id]
                    else:
                        parent_module_data['sum'] = modules_sum[module_id]
                elif parent_module_data['params_rules'] == 41:
                    if 'sum' in parent_module_data:
                        parent_module_data['sum'] += modules_sum[module_id]
                    else:
                        parent_module_data['sum'] = modules_sum[module_id]
                if parent_module_data['parent_id'] == 0:
                    roots[parent_module_data['id']] = parent_module_data['sum']

                found_module_data = parent_module_data

        for value in roots.values():
            sum += value

        return sum
