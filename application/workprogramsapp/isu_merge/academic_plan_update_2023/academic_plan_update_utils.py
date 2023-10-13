import json
import re


class ModuleOrderProvider:
    def __init__(self):
        with open('../application/workprogramsapp/modules-order.json', 'r', encoding='utf-8') as fh:
            self.order = json.load(fh)

    def get_module_order(self):
        return self.order


class AcademicPlanUpdateUtils:
    def __init__(self):
        self.module_order_provide = ModuleOrderProvider()

    @staticmethod
    def clean_text(text):
        cleaned = re.sub('\s+', ' ', text)
        return cleaned.strip()

    @staticmethod
    def hours_status(creds, lec, prac, lab):
        status = ["0" for _ in range(12)]
        if any(creds):
            if any(lec) or any(prac) or any(lab):
                for i in range(len(creds)):
                    if creds[i] != 0:
                        if creds[i] * 36 == lec[i] + prac[i] + lab[i]:
                            status[i] = "ЗЕ равно сумме часов без СРС"
                        elif creds[i] * 36 < lec[i] + prac[i] + lab[i]:
                            status[i] = "ЗЕ меньше, чем часов"
                        else:
                            status[i] = "ОК"
            else:
                return "ЗЕ есть, часов нет"
        else:
            if any(lec) or any(prac) or any(lab):
                return "Нет ЗЕ, но есть часы"
            else:
                return "Нет ничего"
        status = set(status)
        status.remove("0")
        return "".join(sorted(status, reverse=True))

    def set_module(self, module, block, number):
        block = self.clean_text(block)
        if re.search("блок 2", block, flags=re.IGNORECASE):
            module = "Практика"
        elif re.search("блок 3", block, flags=re.IGNORECASE):
            module = "ГИА"
        elif re.search("блок 4", block, flags=re.IGNORECASE):
            module = "Факультативные дисциплины"
        if not module:
            if number == "ЭД":
                module = "Физическая культура (элективная дисциплина)"
            else:
                module = "Неизвестный модуль"
        return module

    @staticmethod
    def get_disciplines_ids_from_academic_plan_json(academic_plan_json):
        disciplines_ids = []
        for blocks in academic_plan_json['disciplines_blocks']:
            for modules in blocks['discipline_modules']:
                for disc in modules['disciplines']:
                    disciplines_ids.append(disc['disc_id'])
        return disciplines_ids

    @staticmethod
    def get_op_language(isu_academic_plan_json):
        op_language = ""
        if isu_academic_plan_json['lang'].strip().find("Русский") != -1 \
                and isu_academic_plan_json['lang'].strip().find("Английский") != -1:
            op_language = "ru/en"
        elif isu_academic_plan_json['lang'].strip() == "Русский":
            op_language = "ru"
        elif isu_academic_plan_json['lang'].strip() == "Английский":
            op_language = "en"
        elif isu_academic_plan_json['lang'].strip() == "Казахский":
            op_language = "kz"
        elif isu_academic_plan_json['lang'].strip() == "Немецкий":
            op_language = "de"
        return op_language

    @staticmethod
    def get_qualification(isu_academic_plan_json):
        training_period = int(float(isu_academic_plan_json['training_period']))
        if training_period == 4:
            qualification = 'bachelor'
        elif training_period == 2:
            qualification = 'master'
        else:
            qualification = 'specialist'
        return qualification

    @staticmethod
    def get_srs(creds, lec, prac, lab):
        status = ["0" for _ in range(12)]
        if any(creds):
            if any(lec) or any(prac) or any(lab):
                for i in range(len(creds)):
                    if creds[i] != 0:
                        if creds[i] * 36 == lec[i] + prac[i] + lab[i]:  # todo consult
                            status[i] = "ЗЕ равно сумме часов без СРС"
                        elif creds[i] * 36 < lec[i] + prac[i] + lab[i]:
                            status[i] = "ЗЕ меньше, чем часов"
                        else:
                            status[i] = "ОК"
            else:
                return "ЗЕ есть, часов нет"
        else:
            if any(lec) or any(prac) or any(lab):
                return "Нет ЗЕ, но есть часы"
            else:
                return "Нет ничего"
        status = set(status)
        status.remove("0")
        return "".join(sorted(status, reverse=True))

    @staticmethod
    def ze_to_format(tuple_to_edit):
        return str(tuple_to_edit).replace("(", "").replace(")", "")

    @staticmethod
    def set_srs(status, creds, lec, prac, lab, module):
        srs = [0 for _ in range(12)]
        if status == "ОК" or (status == "ЗЕ есть, часов нет" and (module == "Практика" or module == "ГИА")):
            for i in range(len(creds)):
                if creds[i] != 0:
                    srs[i] = round(creds[i] * 36 - 1.1 * (lec[i] + prac[i] + lab[i]), 1)
        return tuple(srs)

    @staticmethod
    def get_ze(isu_academic_plan_json):
        ze = []
        for semester in isu_academic_plan_json['ze']:
            if semester['points'] is None:
                ze.append(0)
            else:
                ze.append(semester['points'])
        return tuple(ze)

    @staticmethod
    def get_lec(isu_academic_plan_json):
        lec = []
        for points in isu_academic_plan_json['class_points']:
            if points['lesson'] is None:
                lec.append(0)
            else:
                lec.append(points['lesson'])
        return tuple(lec)

    @staticmethod
    def get_prac(isu_academic_plan_json):
        prac = []
        for points in isu_academic_plan_json['class_points']:
            if points['practice'] is None:
                prac.append(0)
            else:
                prac.append(points['practice'])
        return tuple(prac)

    @staticmethod
    def get_lab(isu_academic_plan_json):
        lab = []
        for points in isu_academic_plan_json['class_points']:
            if points['lab'] is None:
                lab.append(0)
            else:
                lab.append(points['lab'])
        return tuple(lab)

    @staticmethod
    def get_consultation(isu_academic_plan_json):
        consultation = []
        for points in isu_academic_plan_json['class_points']:
            if points['consultation'] is None:
                consultation.append(0)
            else:
                consultation.append(points['consultation'])
        return tuple(consultation)

    @staticmethod
    def num_to_int(code, subj):
        if not code:
            if re.match('Подготовка к защите и защита ВКР', subj, flags=re.IGNORECASE):
                code = "ГИА"
            elif re.match('Производственная, научно-исследовательская работа', subj, flags=re.IGNORECASE):
                code = "П"
            elif re.match('Производственная, технологическая', subj, flags=re.IGNORECASE):
                code = "П"
            elif re.match('Производственная, преддипломная', subj, flags=re.IGNORECASE):
                code = "ПП"
            elif re.match('Иностранный язык', subj, flags=re.IGNORECASE):
                code = "1000"
        if not str(code).isdigit() and not str(code).isalpha():
            return str(code).replace(".", "")
        elif not str(code).isdigit():
            return "".join([str(ord(chr)) for chr in str(code)])
        else:
            return str(code)

    @staticmethod
    def set_control(tool, years):
        terms = [0 for _ in range(12)]
        if tool:
            tool = str(tool)
            term_list = []
            if int(years) == 2:
                possible_terms, last_term = ("1", "2", "3", "4"), "4"
            elif int(years) == 4:
                possible_terms, last_term = ("1", "2", "3", "4", "5", "6", "7", "8"), "8"
            else:
                possible_terms, last_term = ("11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"), "11"
            for term in possible_terms:
                if term in tool:
                    term_list.append(term)
                    tool = tool.replace(term, "")
            for term in term_list:
                terms[int(term) - 1] = 1
        return tuple(terms)

    def get_module_order(self, isu_academic_plan_block_module_json):
        order = self.module_order_provide.get_module_order()
        try:
            module_order = order[isu_academic_plan_block_module_json['module_name']]
        except:
            order.update({(isu_academic_plan_block_module_json['module_name'].strip()): len(order)})
            module_order = order[(isu_academic_plan_block_module_json['module_name'].strip())]
        return module_order
