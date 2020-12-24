export enum fields {
    EDUCATIONAL_PLAN_LIST = 'EDUCATIONAL_PLAN_LIST',
    EDUCATIONAL_PLAN_DIALOG = 'EDUCATIONAL_PLAN_DIALOG',
    EDUCATIONAL_PLAN_DETAIL_DIALOG = 'EDUCATIONAL_PLAN_DETAIL_DIALOG',
    EDUCATIONAL_PLAN_MODULE_DIALOG = 'EDUCATIONAL_PLAN_MODULE_DIALOG',
    DOWNLOAD_DIALOG = 'DOWNLOAD_DIALOG',
    IS_OPEN_DIALOG = 'IS_OPEN_DIALOG',
    DIALOG_DATA = 'DIALOG_DATA',
    SEARCH_QUERY = 'SEARCH_QUERY',
    CURRENT_PAGE = 'CURRENT_PAGE',
    ALL_COUNT = 'ALL_COUNT',
    SORTING = 'SORTING',
    SORTING_FIELD = 'SORTING_FIELD',
    SORTING_MODE = 'SORTING_MODE',
    DETAIL_PLAN = 'DETAIL_PLAN',
    DIRECTIONS_DEPENDED_ON_WORK_PROGRAM = 'DIRECTIONS_DEPENDED_ON_WORK_PROGRAM',
}

export enum fetchingTypes {
    GET_EDUCATIONAL_PLANS = 'GET_EDUCATIONAL_PLANS',
    GET_EDUCATIONAL_PLAN_DETAIL = 'GET_EDUCATIONAL_PLAN_DETAIL',
    DELETE_EDUCATIONAL_PLAN = 'DELETE_EDUCATIONAL_PLAN',
    UPDATE_EDUCATIONAL_PLAN = 'UPDATE_EDUCATIONAL_PLAN',
    CREATE_EDUCATIONAL_PLAN = 'CREATE_EDUCATIONAL_PLAN',
    CREATE_BLOCK_OF_WORK_PROGRAMS = 'CREATE_BLOCK_OF_WORK_PROGRAMS',
    CHANGE_BLOCK_OF_WORK_PROGRAMS = 'CHANGE_BLOCK_OF_WORK_PROGRAMS',
    DELETE_BLOCK_OF_WORK_PROGRAMS = 'DELETE_BLOCK_OF_WORK_PROGRAMS',
    CHANGE_MODULE = 'CHANGE_MODULE',
    CREATE_MODULE = 'CREATE_MODULE',
    DELETE_MODULE = 'DELETE_MODULE',
    GET_DIRECTIONS_DEPENDED_ON_WORK_PROGRAM = 'GET_DIRECTIONS_DEPENDED_ON_WORK_PROGRAM',
    SAVE_COMPETENCE_BLOCK = 'SAVE_COMPETENCE_BLOCK',
    DELETE_COMPETENCE_BLOCK = 'DELETE_COMPETENCE_BLOCK',
    DELETE_WP_FROM_ZUN = 'DELETE_WP_FROM_ZUN',
}

export enum EducationalPlanFields {
    ID = 'id',
    PROFILE = 'educational_profile',
    APPROVAL_DATE = 'approval_date',
    NUMBER = 'number',
    DISCIPLINE_BLOCKS = 'discipline_blocks_in_academic_plan',
    EDUCATION_FORM = 'education_form',
    YEAR = 'year',
    QUALIFICATION = 'qualification',
    CAN_EDIT = 'can_edit',
    ID_RATING = 'id_rating',
    RATING = 'rating',
}

export enum EducationalPlanBlockFields {
    ID = 'id',
    NAME = 'name',
    MODULES = 'modules_in_discipline_block',
}

export enum ModuleFields {
    ID = 'id',
    NAME = 'name',
    BLOCKS_OF_WORK_PROGRAMS = 'change_blocks_of_work_programs_in_modules',
}

export enum BlocksOfWorkProgramsFields {
    ID = 'id',
    WORK_PROGRAMS = 'work_program',
    COMPETENCES = 'competences',
    INDICATORS = 'indicators',
    RESULTS = 'results',
    SEMESTER_UNIT = 'credit_units',
    TYPE = 'change_type',
}

export enum DownloadFileModalFields {
    ID = 'pk',
    DIRECTION_ID = 'field_of_study_id',
    ACADEMIC_PLAN_ID = 'academic_plan_id',
    YEAR = 'year',
}