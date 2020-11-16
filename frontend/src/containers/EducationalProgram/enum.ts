export enum fields {
    EDUCATION_PROGRAM_CHARACTERISTIC = 'EDUCATION_PROGRAM_CHARACTERISTIC',
    EDUCATION_PROGRAM_LIST = 'EDUCATION_PROGRAM_LIST',
    EDUCATION_PROGRAM_DIALOG = 'EDUCATION_PROGRAM_DIALOG',
    IS_OPEN_DIALOG = 'IS_OPEN_DIALOG',
    DIALOG_DATA = 'DIALOG_DATA',
    SEARCH_QUERY = 'SEARCH_QUERY',
    CURRENT_PAGE = 'CURRENT_PAGE',
    ALL_COUNT = 'ALL_COUNT',
    SORTING = 'SORTING',
    SORTING_FIELD = 'SORTING_FIELD',
    SORTING_MODE = 'SORTING_MODE',
}

export enum fetchingTypes {
    GET_EDUCATION_PROGRAM_LIST = 'GET_EDUCATION_PROGRAM_LIST',
    DELETE_EDUCATION_PROGRAM = 'DELETE_EDUCATION_PROGRAM',
    UPDATE_EDUCATION_PROGRAM = 'UPDATE_EDUCATION_PROGRAM',
    CREATE_EDUCATION_PROGRAM = 'CREATE_EDUCATION_PROGRAM',
}

export enum EducationProgramCharacteristicFields {
    ID = 'id',
    DIRECTION = 'area_of_activity',
    DEAN = 'dean_of_the_faculty',
    DEVELOPERS = 'developers',
    DIRECTOR_MEGAFALCULTY = 'director_of_megafaculty',
    EMPLOYERS = 'employers_representatives',
    KC_COMPETENCES = 'kc_competences',
    NP_COMPETENCES = 'np_competences',
    OK_COMPETENCES = 'ok_competences',
    PK_COMPETENCES = 'pk_competences',
    SCIENTIFIC_SUPERVISOR = 'scientific_supervisor_of_the_educational_program',
    EDUCATION_PROGRAM = 'educational_program',
    KINDS_OF_ACTIVITIES = 'kinds_of_activity',
    OBJECTS_OF_ACTIVITY = 'objects_of_activity',
    TASKS_OF_ACTIVITY = 'tasks_of_activity',
    PPS = 'pps',
    ANNOTATION = 'annotation',
}

export enum EducationProgramFields {
    ID = 'id',
    ACADEMIC_PLAN_FOR_EP = 'academic_plan_for_ep',
    ACADEMIC_PLAN = 'academic_plan',
    FIELD_OF_STUDY = 'field_of_study',
    YEAR = 'year_of_recruitment',
    QUALIFICATION = 'qualification',
    MANAGER = 'manager',
}