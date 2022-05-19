export enum CertificationFields {
    ID = "id",
    DISCIPLINE_CODE= "discipline_code",
    TITLE= "title",
    YEAR= "year",
    AUTHORS= "authors",
    OP_LEADER= "op_leader",
    GENERAL_PROVISIONS_OTHER_DOCUMENTS= "general_provisions_other_documents",
    FILLING_AND_APPROVAL_TIME= "filling_and_approval_time",
    WORK_ON_VKR_CONTENT_TIME= "work_on_vkr_content_time",
    PRE_DEFENCE_TIME= "pre_defence_time",
    ANTI_PLAGIARISM_ANALYSIS_TIME= "anti_plagiarism_analysis_time",
    PRELIMINARY_DEFENSE= "preliminary_defense",
    ANTI_PLAGIARISM= "anti_plagiarism",
    STRUCTURE_ELEMENTS_OPTIONAL= "structure_elements_optional",
    OPTIONAL_DESIGN_REQUIREMENTS= "optional_design_requirements",
    CONTENT_REQUIREMENTS= "content_requirements",
    DEFENCE_PRESENTATION_REQUIREMENTS= "defence_presentation_requirements",
    STRUCTURAL_UNIT= "structural_unit",
    CONTENT_CORRESPONDENCE_MARKS= "content_correspondence_marks",
    RELEVANCE_MARKS= "relevance_marks",
    SPECIALIZATION_CORRESPONDENCE_MARKS= "specialization_correspondence_marks",
    CORRECTNESS_OF_METHODS_MARKS= "correctness_of_methods_marks",
    QUALITY_AND_LOGIC_MARKS= "quality_and_logic_marks",
    VALIDITY_MARKS= "validity_marks",
    SIGNIFICANCE_MARKS= "significance_marks",
    IMPLEMENTATION_MARKS= "implementation_marks",
    REPORT_QUALITY_MARKS= "report_quality_marks",
    PRESENTATION_QUALITY_MARKS= "presentation_quality_marks",
    ANSWERS_QUALITY_MARKS= "answers_quality_marks",
    GIA_BASE= "gia_base",
}

export enum TemplateTextCertificationFields {
    ID = "id",
    GIA_COMPONENTS= "gia_components",
    GENERAL_PROVISIONS = "general_provisions",
    VKR_THEME_CHOICE_TIME= "vkr_theme_choice_time",
    CORRECTION_THEME_TIME = "correction_theme_time",
    UPLOAD_TO_ISU_TIME = "upload_to_isu_time",
    MANAGER_FEEDBACK_TIME = "manager_feedback_time",
    MANAGER_FEEDBACK_ACCEPTION_TIME = "manager_feedback_acception_time",
    PRESENTATION_OF_MATERIALS_TIME = "presentation_of_materials_time",
    VKR_DEFENCE_TIME = "vkr_defence_time",
    STRUCTURE_ELEMENTS = "structure_elements",
    VKR_MARK = "vkr_mark",
    GIA_OVZ = "gia_ovz",
    TEMPLATE_YEAR = "template_year",
    PROFESSIONAL_PROBLEMS_MARKS = "professional_problems_marks",
}

export enum CertificationMarkFields {
    ID = 'id',
    GREAT = 'great',
    GOOD = 'good',
    SATISFACTORILY = 'satisfactorily',
    UNSATISFACTORY = 'unsatisfactory',
}

export enum StructuralUnitFields {
    ID = "id",
    TITLE = "title",
    ISU_ID = "isu_id",
}

export enum CertificationStepsRussian {
    MAIN = 'Главное',
    GENERAL_PROVISIONS = 'Общие положения',
    DATES = 'Основные этапы и сроки подготовки ВКР',
    FEATURES = 'Особенности подготовки ВКР',
    ASSESSMENT = 'Оценка ВКР на заседании ГЭК',
    DISABLED_PEOPLE = 'Проведение ГИА для лиц с ОВЗ'
}

export enum OptionalRequirements {
    ACRONYMS = 'acronyms',
    DEFINITIONS = 'definitions',
    ILLUSTRATIONS = 'illustrations',
    APPENDIX = 'appendix',
}

export enum fetchingTypes {
    GET_CERTIFICATION = 'GET_CERTIFICATION',
    GET_TEMPLATE_TEXT = 'GET_TEMPLATE_TEXT',
    CREATE_CERTIFICATION = 'CREATE_CERTIFICATION',
    GET_CERTIFICATION_LIST = 'GET_CERTIFICATION_LIST',
}

export const OptionalRequirementsRussian = new Map(Object.entries({
    [OptionalRequirements.ACRONYMS]: 'Список сокращений и условных обозначений',
    [OptionalRequirements.DEFINITIONS]: 'Термины и определения',
    [OptionalRequirements.ILLUSTRATIONS]: 'Список иллюстративного материала',
    [OptionalRequirements.APPENDIX]: 'Приложения',
}))

export const CertificationStepsRussianList = Object.entries(CertificationStepsRussian).map(([, value]) => value);