export enum fields {
    WORK_PROGRAM_ID = 'WORK_PROGRAM_ID',
    WORK_PROGRAM = 'WORK_PROGRAM',
    WORK_PROGRAM_TITLE = 'title',
    WORK_PROGRAM_CODE = 'discipline_code',
    WORK_PROGRAM_QUALIFICATION = 'qualification',
    WORK_PROGRAM_SECTIONS = 'discipline_sections',
    WORK_PROGRAM_PREREQUISITES = 'prerequisites',
    WORK_PROGRAM_BIBLIOGRAPHIC_REFERENCE = 'bibliographic_reference',
    DIALOGS = 'DIALOGS',
    CREATE_NEW_TOPIC_DIALOG = 'CREATE_NEW_TOPIC_DIALOG',
    ADD_NEW_LITERATURE = 'ADD_NEW_LITERATURE',
    ADD_NEW_PREREQUISITES = 'ADD_NEW_PREREQUISITES',
    CREATE_NEW_EVALUATION_TOOLS = 'CREATE_NEW_EVALUATION_TOOLS',
    SHOW_EVALUATION_TOOLS_DESCRIPTION = 'SHOW_EVALUATION_TOOLS_DESCRIPTION',
    IS_OPEN_DIALOG = 'IS_OPEN_DIALOG',
    DIALOG_DATA = 'DIALOG_DATA',
    WORK_PROGRAM_EVALUATION_TOOLS = 'WORK_PROGRAM_EVALUATION_TOOLS',
}

export enum workProgramSectionFields {
    ID = 'id',
    ORDINAL_NUMBER = 'ordinal_number',
    NAME = 'name',
    SPO = 'SRO',
    CONTACT_WORK = 'contact_work',
    LECTURE_CLASSES = 'lecture_classes',
    PRACTICAL_LESSONS = 'practical_lessons',
    LABORATORY = 'laboratory',
    TOTAL_HOURS = 'total_hours',
    TOPICS = 'topics',
}

export enum workProgramTopicFields {
    ID = 'id',
    NUMBER = 'number',
    DESCRIPTION = 'description',
    SECTION = 'discipline_section',
    COURSE = 'url_online_course',
}

export enum fetchingTypes {
    GET_WORK_PROGRAM = 'GET_WORK_PROGRAM',
    GET_WORK_PROGRAM_EVALUATION_TOOLS = 'GET_WORK_PROGRAM_EVALUATION_TOOLS',

    SAVE_SECTION = 'SAVE_SECTION',
    DELETE_SECTION = 'DELETE_SECTION',
    CHANGE_SECTION_NUMBER = 'CHANGE_SECTION_NUMBER',

    SAVE_TOPIC = 'SAVE_TOPIC',
    DELETE_TOPIC = 'DELETE_TOPIC',
    CHANGE_TOPIC_NUMBER = 'CHANGE_TOPIC_NUMBER',

    DELETE_LITERATURE = 'DELETE_LITERATURE',
    ADD_LITERATURE = 'ADD_LITERATURE',

    ADD_PREREQUISITES = 'ADD_PREREQUISITES',
    CHANGE_PREREQUISITES = 'CHANGE_PREREQUISITES',
    DELETE_PREREQUISITES = 'DELETE_PREREQUISITES',

    ADD_EVALUATION_TOOL = 'ADD_EVALUATION_TOOL',
    CHANGE_EVALUATION_TOOL = 'CHANGE_EVALUATION_TOOL',
    DELETE_EVALUATION_TOOL = 'DELETE_EVALUATION_TOOL',
}

export enum PrerequisiteFields {
    ID = 'id',
    MASTER_LEVEL = 'masterylevel',
    ITEM = 'item',
}

export enum EvaluationToolFields {
    ID = 'id',
    NAME = 'name',
    MIN = 'min',
    MAX = 'max',
    TYPE = 'type',
    DEADLINE = 'deadline',
    DESCRIPTION = 'description',
    CHECK_POINT = 'check_point',
    SECTIONS = 'descipline_sections',
}