import {CertificationFields} from "./enum";

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
    [CertificationFields.YEAR]: 'Год проведения',
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
}