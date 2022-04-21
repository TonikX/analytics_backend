export enum PracticeFields {
    ID = 'id',
    YEAR = 'year',
    AUTHORS = 'authors',
    OP_LEADER = 'op_leader',
    LANGUAGE = "language",
    QUALIFICATION = "qualification",
    KIND_OF_PRACTICE = "kind_of_practice",
    TYPE_OF_PRACTICE = "type_of_practice",
    WAY_OF_DOING_PRACTICE = "way_of_doing_practice",
    FORMAT_PRACTICE = "format_practice",
    FEATURES_CONTENT_AND_INTERNSHIP = "features_content_and_internship",
    ADDITIONAL_REPORTING_MATERIALS = "additional_reporting_materials",
    FORM_OF_CERTIFICATION_TOOLS = "form_of_certification_tools",
    PASSED_GREAT_MARK = "passed_great_mark",
    PASSED_GOOD_MARK = "passed_good_mark",
    PASSED_SATISFACTORILY_MARK = "passed_satisfactorily_mark",
    NOT_PASSED_MARK = "not_passed_mark",
    BIBLIOGRAPHIC_REFERENCE = "bibliographic_reference",
}

export enum PracticeStepsRussian {
    GENERAL = 'Главное',
    FEATURES = 'Особенности',
    ASSESSMENT = 'Оценка',
    REFERENCES = 'Источники',
}

export const PracticeStepsRussianList = Object.entries(PracticeStepsRussian).map(([key, value]) => value);