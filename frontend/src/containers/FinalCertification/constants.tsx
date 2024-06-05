import React from "react";
import {CertificationFields, CertificationSteps} from "./enum";
import MainInfo from "./Steps/MainInfo";
import GeneralProvisions from "./Steps/GeneralProvisions";
import Dates from "./Steps/Dates";
import Features from "./Steps/Features";
import Assessment from "./Steps/Assessment";
import DisabledPeopleInfo from "./Steps/DisabledPeopleInfo";

export const markTypesRussian = [
    {
        field: CertificationFields.CONTENT_CORRESPONDENCE_MARKS,
        value: 'Соответствие содержания работы утвержденной теме ВКР',
    },
    {
        field: CertificationFields.RELEVANCE_MARKS,
        value: 'Обоснование актуальности темы, корректность постановки цели и задач исследования',
    },
    {
        field: CertificationFields.SPECIALIZATION_CORRESPONDENCE_MARKS,
        value: 'Соответствие  работы направлению, профилю и специализации подготовки',
    },
    {
        field: CertificationFields.CORRECTNESS_OF_METHODS_MARKS,
        value: 'Корректность выбора использования методов исследования',
    },
    {
        field: CertificationFields.QUALITY_AND_LOGIC_MARKS,
        value: 'Качество, логика и полнота изложения представленных материалов',
    },
    {
        field: CertificationFields.VALIDITY_MARKS,
        value: 'Обоснованность положений, выносимых на защиту',
    },
    {
        field: CertificationFields.SIGNIFICANCE_MARKS,
        value: 'Научная и/или практическая значимость работы',
    },
    {
        field: CertificationFields.IMPLEMENTATION_MARKS,
        value: 'Внедрение результатов работы',
    },
    {
        field: CertificationFields.REPORT_QUALITY_MARKS,
        value: 'Качество доклада',
    },
    {
        field: CertificationFields.PRESENTATION_QUALITY_MARKS,
        value: 'Качество презентации',
    },
    {
        field: CertificationFields.ANSWERS_QUALITY_MARKS,
        value: 'Качество и уровень ответов на вопросы',
    },
];

export const RussianCertificationFields = {
    [CertificationFields.ID]: 'ID',
    [CertificationFields.DISCIPLINE_CODE]: 'Код дисциплины',
    [CertificationFields.TITLE]: 'Название',
    [CertificationFields.YEAR]: 'Год заполнения программы',
    [CertificationFields.AUTHORS]: 'Авторский состав',
    [CertificationFields.OP_LEADER]: 'Руководитель образовательной программы',
    [CertificationFields.STRUCTURAL_UNIT]: 'Структурное подразделение',
    [CertificationFields.GENERAL_PROVISIONS_OTHER_DOCUMENTS]: 'Другие нормативные документы',
    [CertificationFields.FILLING_AND_APPROVAL_TIME]: 'Заполнение и согласование задания на ВКР в ИСУ',
    [CertificationFields.WORK_ON_VKR_CONTENT_TIME]: 'Работа над содержанием ВКР',
    [CertificationFields.PRE_DEFENCE_TIME]: 'Предварительная защита ВКР',
    [CertificationFields.ANTI_PLAGIARISM_ANALYSIS_TIME]: 'Проверка текста ВКР в системе "Антиплагиат"',
    [CertificationFields.PRELIMINARY_DEFENSE]: 'Предварительная защита ВКР',
    [CertificationFields.ANTI_PLAGIARISM]: 'Проверка текста ВКР в системе "Антиплагиат"',
    [CertificationFields.STRUCTURE_ELEMENTS_OPTIONAL]: 'Опциональные требования к оформлению ВКР',
    [CertificationFields.OPTIONAL_DESIGN_REQUIREMENTS]: 'Дополнительные требования к оформлению ВКР',
    [CertificationFields.CONTENT_REQUIREMENTS]: 'Требования к содержанию ВКР',
    [CertificationFields.DEFENCE_PRESENTATION_REQUIREMENTS]: 'Требования к представлению ВКР на защите',
    [CertificationFields.CONTENT_CORRESPONDENCE_MARKS]: '',
    [CertificationFields.RELEVANCE_MARKS]: '',
    [CertificationFields.SPECIALIZATION_CORRESPONDENCE_MARKS]: '',
    [CertificationFields.CORRECTNESS_OF_METHODS_MARKS]: '',
    [CertificationFields.QUALITY_AND_LOGIC_MARKS]: '',
    [CertificationFields.VALIDITY_MARKS]: '',
    [CertificationFields.SIGNIFICANCE_MARKS]: '',
    [CertificationFields.SIGNIFICANCE_MARKS]: '',
    [CertificationFields.IMPLEMENTATION_MARKS]: '',
    [CertificationFields.REPORT_QUALITY_MARKS]: '',
    [CertificationFields.PRESENTATION_QUALITY_MARKS]: '',
    [CertificationFields.ANSWERS_QUALITY_MARKS]: '',
    [CertificationFields.GIA_BASE]: 'текст шаблона',
    [CertificationFields.EDITORS]: 'Редакторы',
    [CertificationFields.PERMISSIONS_INFO]: 'Информация о правах',
    [CertificationFields.SEMESTER_COUNT]: 'Длительность в семестрах',
    [CertificationFields.QUALIFICATION]: 'Уровень образовательной программы',
    [CertificationFields.ZE_V_SEM]: 'Зачетные единицы',
    [CertificationFields.EVALUATION_TOOLS]: 'Аттестационное оценочное средство',
}
export const fieldToStep = new Map(Object.entries({
    [CertificationFields.ID]: CertificationSteps.MAIN,
    [CertificationFields.DISCIPLINE_CODE]: CertificationSteps.MAIN,
    [CertificationFields.TITLE]: CertificationSteps.MAIN,
    [CertificationFields.YEAR]: CertificationSteps.MAIN,
    [CertificationFields.AUTHORS]: CertificationSteps.MAIN,
    [CertificationFields.OP_LEADER]: CertificationSteps.MAIN,
    [CertificationFields.STRUCTURAL_UNIT]: CertificationSteps.MAIN,
    [CertificationFields.GENERAL_PROVISIONS_OTHER_DOCUMENTS]: CertificationSteps.GENERAL_PROVISIONS,
    [CertificationFields.FILLING_AND_APPROVAL_TIME]: CertificationSteps.DATES,
    [CertificationFields.WORK_ON_VKR_CONTENT_TIME]: CertificationSteps.DATES,
    [CertificationFields.PRE_DEFENCE_TIME]: CertificationSteps.DATES,
    [CertificationFields.ANTI_PLAGIARISM_ANALYSIS_TIME]: CertificationSteps.DATES,
    [CertificationFields.PRELIMINARY_DEFENSE]: CertificationSteps.FEATURES,
    [CertificationFields.ANTI_PLAGIARISM]: CertificationSteps.FEATURES,
    [CertificationFields.STRUCTURE_ELEMENTS_OPTIONAL]: CertificationSteps.FEATURES,
    [CertificationFields.OPTIONAL_DESIGN_REQUIREMENTS]: CertificationSteps.FEATURES,
    [CertificationFields.CONTENT_REQUIREMENTS]: CertificationSteps.FEATURES,
    [CertificationFields.DEFENCE_PRESENTATION_REQUIREMENTS]: CertificationSteps.FEATURES,
    [CertificationFields.CONTENT_CORRESPONDENCE_MARKS]: CertificationSteps.ASSESSMENT,
    [CertificationFields.RELEVANCE_MARKS]: CertificationSteps.ASSESSMENT,
    [CertificationFields.SPECIALIZATION_CORRESPONDENCE_MARKS]: CertificationSteps.ASSESSMENT,
    [CertificationFields.CORRECTNESS_OF_METHODS_MARKS]: CertificationSteps.ASSESSMENT,
    [CertificationFields.QUALITY_AND_LOGIC_MARKS]: CertificationSteps.ASSESSMENT,
    [CertificationFields.VALIDITY_MARKS]: CertificationSteps.ASSESSMENT,
    [CertificationFields.SIGNIFICANCE_MARKS]: CertificationSteps.ASSESSMENT,
    [CertificationFields.SIGNIFICANCE_MARKS]: CertificationSteps.ASSESSMENT,
    [CertificationFields.IMPLEMENTATION_MARKS]: CertificationSteps.ASSESSMENT,
    [CertificationFields.REPORT_QUALITY_MARKS]: CertificationSteps.ASSESSMENT,
    [CertificationFields.PRESENTATION_QUALITY_MARKS]: CertificationSteps.ASSESSMENT,
    [CertificationFields.ANSWERS_QUALITY_MARKS]: CertificationSteps.ASSESSMENT,
    [CertificationFields.GIA_BASE]: CertificationSteps.MAIN,
}))

export const STEPS = [
    {
        name: CertificationSteps.MAIN,
        component: <MainInfo/>,
    },
    {
        name: CertificationSteps.GENERAL_PROVISIONS,
        component: <GeneralProvisions/>,
    },
    {
        name: CertificationSteps.DATES,
        component: <Dates/>,
    },
    {
        name: CertificationSteps.FEATURES,
        component: <Features/>,
    },
    {
        name: CertificationSteps.ASSESSMENT,
        component: <Assessment/>,
    },
    {
        name: CertificationSteps.DISABLED_PEOPLE,
        component: <DisabledPeopleInfo/>,
    },
];
