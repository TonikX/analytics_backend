export enum fields {
    WORK_PROGRAM = 'WORK_PROGRAM',
    WORK_PROGRAM_TITLE = 'title',
    WORK_PROGRAM_CODE = 'discipline_code',
    WORK_PROGRAM_QUALIFICATION = 'qualification',
    WORK_PROGRAM_SECTIONS = 'discipline_sections',
    WORK_PROGRAM_PREREQUISITES = 'prerequisites',
    WORK_PROGRAM_RESULTS = 'outcomes',
    WORK_PROGRAM_COMMENTS = 'comments',
    WORK_PROGRAM_BIBLIOGRAPHIC_REFERENCE = 'bibliographic_reference',
    WORK_PROGRAM_EVALUATION_TOOLS = 'WORK_PROGRAM_EVALUATION_TOOLS',
    WORK_PROGRAM_EVALUATION_TOOL = 'WORK_PROGRAM_EVALUATION_TOOL',
    WORK_PROGRAM_INTERMEDIATE_CERTIFICATION_TOOLS = 'certification_evaluation_tools',
    WORK_PROGRAM_INTERMEDIATE_CERTIFICATION_TOOL = 'certification_evaluation_tool',
    WORK_PROGRAM_ALL_HOURS = 'hours',
    WORK_PROGRAM_COMPETENCES = 'competences',

    DIALOGS = 'DIALOGS',
    CREATE_NEW_TOPIC_DIALOG = 'CREATE_NEW_TOPIC_DIALOG',
    ADD_NEW_MATERIAL_TO_TOPIC = 'ADD_NEW_MATERIAL_TO_TOPIC',
    ADD_NEW_LITERATURE = 'ADD_NEW_LITERATURE',
    ADD_NEW_PREREQUISITES = 'ADD_NEW_PREREQUISITES',
    CREATE_NEW_EVALUATION_TOOLS = 'CREATE_NEW_EVALUATION_TOOLS',
    SHOW_EVALUATION_TOOLS_DESCRIPTION = 'SHOW_EVALUATION_TOOLS_DESCRIPTION',
    ADD_NEW_RESULT = 'ADD_NEW_RESULT',
    IS_OPEN_DIALOG = 'IS_OPEN_DIALOG',
    DIALOG_DATA = 'DIALOG_DATA',

    CREATE_NEW_INTERMEDIATE_CERTIFICATION = 'CREATE_NEW_INTERMEDIATE_CERTIFICATION',
    SHOW_INTERMEDIATE_CERTIFICATION_DESCRIPTION = 'SHOW_INTERMEDIATE_CERTIFICATION_DESCRIPTION',
}

export enum WorkProgramGeneralFields {
    ID = 'id',
    TITLE = 'title',
    TITLE_EN = 'title_en',
    DISCIPLINE_CODE = 'discipline_code',
    CODE = 'discipline_code',
    QUALIFICATION = 'qualification',
    IMPLEMENTATION_FORMAT = 'implementation_format',
    LANGUAGE = 'language',
    STRUCTURAL_UNIT = 'structural_unit',
    APPROVAL_DATE = 'approval_date',
    AUTHORS = 'authors',
    RATING = 'rating',
    RATING_ID = 'id_rating',
    VIDEO_LINK = 'video',
    SEMESTER_COUNT = 'number_of_semesters',
    DESCRIPTION = 'description',
    MOODLE_LINK = 'moodle_link',
    ZUN = 'zuns_for_wp',
    CAN_COMMENT = 'can_comment',
    CAN_ADD_TO_FOLDER = 'can_add_to_folder',
    IS_STUDENT = 'is_student',
    CAN_ARCHIVE = 'can_archive',
    CAN_APPROVE = 'can_approve',
    CAN_SEND_TO_ISU = 'can_send_to_isu',
    CAN_EDIT = 'can_edit',
    EXPERTISE_STATUS = 'status',
    USER_EXPERTISE_ID = 'user_expertise_id',
    EXPERTISE_ID_2 = 'use_chat_with_id_expertise',
    EXTRA_POINTS = 'extra_points',
    EDITORS = 'editors',
    BARS = 'bars',
    OFFERTA = 'is_oferta',
    LAB_HOURS = 'lab_hours_v2',
    SRS_HOURS = 'srs_hours_v2',
    HOURS = 'hours',
    PRACTICE_HOURS = 'practice_hours_v2',
    LECTURE_HOURS = 'lecture_hours_v2',
    ZE_V_SEM = 'ze_v_sem',
    EVALUATION_TOOLS = 'evaluation_tools',
    WORK_PROGRAM_IN_CHANGE_BLOCK = 'work_program_in_change_block',
    CONSULTATIONS = 'consultation_v2',
}

export enum workProgramSectionFields {
    ID = 'id',
    ORDINAL_NUMBER = 'ordinal_number',
    NAME = 'name',
    SPO = 'SRO',
    CONSULTATIONS = 'consultations',
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
    MATERIALS = 'additional_materials_for_topic',
    MATERIAL_TITLE = 'title',
    MATERIAL_URL = 'url',
}

export enum fetchingTypes {
    GET_RESULTS = 'GET_RESULTS',
    UPDATE_UNREAD_COMMENT_STATUS = 'UPDATE_UNREAD_COMMENT_STATUS',
    CLONE_WORK_PROGRAM = 'CLONE_WORK_PROGRAM',

    SEND_TO_EXPERTISE = 'SEND_TO_EXPERTISE',
    SEND_TO_ARCHIVE = 'SEND_TO_ARCHIVE',
    APPROVE_WORK_PROGRAM = 'APPROVE_WORK_PROGRAM',
    SEND_TO_WORK = 'SEND_TO_WORK',
    SEND_TO_ISU = 'SEND_TO_ISU',
    SAVE_ZUN = 'SAVE_ZUN',
    DELETE_ZUN = 'DELETE_ZUN',
    UPDATE_ZUN = 'UPDATE_ZUN',

    GET_WORK_PROGRAM = 'GET_WORK_PROGRAM',
    GET_WORK_PROGRAM_EVALUATION_TOOLS = 'GET_WORK_PROGRAM_EVALUATION_TOOLS',

    SAVE_SECTION = 'SAVE_SECTION',
    DELETE_SECTION = 'DELETE_SECTION',
    CHANGE_SECTION_NUMBER = 'CHANGE_SECTION_NUMBER',

    SAVE_TOPIC = 'SAVE_TOPIC',
    DELETE_TOPIC = 'DELETE_TOPIC',
    CHANGE_TOPIC_NUMBER = 'CHANGE_TOPIC_NUMBER',
    ADD_TOPIC_MATERIAL = 'ADD_TOPIC_MATERIAL',
    UPDATE_TOPIC_MATERIAL = 'UPDATE_TOPIC_MATERIAL',
    DELETE_TOPIC_MATERIAL = 'DELETE_TOPIC_MATERIAL',

    DELETE_LITERATURE = 'DELETE_LITERATURE',
    ADD_LITERATURE = 'ADD_LITERATURE',

    ADD_PREREQUISITES = 'ADD_PREREQUISITES',
    CHANGE_PREREQUISITES = 'CHANGE_PREREQUISITES',
    DELETE_PREREQUISITES = 'DELETE_PREREQUISITES',

    ADD_EVALUATION_TOOL = 'ADD_EVALUATION_TOOL',
    CHANGE_EVALUATION_TOOL = 'CHANGE_EVALUATION_TOOL',
    DELETE_EVALUATION_TOOL = 'DELETE_EVALUATION_TOOL',
    GET_EVALUATION_TOOL = 'GET_EVALUATION_TOOL',

    ADD_INTERMEDIATE_CERTIFICATION = 'ADD_INTERMEDIATE_CERTIFICATION',
    CHANGE_INTERMEDIATE_CERTIFICATION = 'CHANGE_INTERMEDIATE_CERTIFICATION',
    DELETE_INTERMEDIATE_CERTIFICATION = 'DELETE_INTERMEDIATE_CERTIFICATION',
    GET_INTERMEDIATE_CERTIFICATION = 'GET_INTERMEDIATE_CERTIFICATION',

    ADD_RESULT = 'ADD_RESULT',
    CHANGE_RESULT = 'CHANGE_RESULT',
    DELETE_RESULT = 'DELETE_RESULT',

    GET_COMMENTS = 'GET_COMMENTS',
    CREATE_COMMENT = 'CREATE_COMMENT',
}

export enum PrerequisiteFields {
    ID = 'id',
    MASTER_LEVEL = 'masterylevel',
    ITEM = 'item',
}

export enum ResultsFields {
    ID = 'id',
    MASTER_LEVEL = 'masterylevel',
    ITEM = 'item',
    EVALUATION_TOOLS = 'evaluation_tool',
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
    SEMESTER = 'semester',
}

export enum IntermediateCertificationFields {
    ID = 'id',
    NAME = 'name',
    MIN = 'min',
    MAX = 'max',
    TYPE = 'type',
    DEADLINE = 'deadline',
    DESCRIPTION = 'description',
    CHECK_POINT = 'check_point',
    SECTIONS = 'descipline_sections',
    SEMESTER = 'semester',
}

export enum WorkProgramStatusEnum {
    AT_WORK = 'WK',
    EXPERTISE = 'EX',
    APPROVE = 'AC',
    ARCHIVE = 'AR',
    REWORK = 'RE',
}

export enum IntermediateCertificationEnum {
    EXAM = '1',
    DIF_CREDIT = '2',
    CREDIT = '3',
    COURSE_WORK = '4',
    COURSE_PROJECT = '5',
}

export enum StepsEnum {
    GENERAL = 'MA',
    PREREQUISITES = 'PR',
    SECTIONS = 'SE',
    TOPICS = 'TH',
    LITERATURE = 'SO',
    EVALUATION = 'EV',
    INTERMEDIATE_CERTIFICATION = 'CO',
    RESULTS = 'RE',
    PLANS = 'PL',
    COMPETENCES = 'CM',
}

export enum CommentFields {
    DATE = 'comment_date',
    TEXT = 'comment_text',
    ID = 'id',
    USER_EXPERTISE = 'user_expertise',
    EXPERT = 'expert',
}

export enum ImplementationFormatsEnum {
    ONLINE = 'online',
    MIXED = 'mixed',
    OFFLINE = 'offline',
}
