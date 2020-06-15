export enum fields {
    EDUCATION_PLAN_IN_DIRECTION = 'EDUCATION_PLAN_IN_DIRECTION',
    EDUCATION_PLAN_IN_DIRECTION_DIALOG = 'EDUCATION_PLAN_IN_DIRECTION_DIALOG',
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
    GET_EDUCATION_PLAN_IN_DIRECTION = 'GET_EDUCATION_PLAN_IN_DIRECTION',
    DELETE_EDUCATION_PLAN_IN_DIRECTION = 'DELETE_EDUCATION_PLAN_IN_DIRECTION',
    UPDATE_EDUCATION_PLAN_IN_DIRECTION = 'UPDATE_EDUCATION_PLAN_IN_DIRECTION',
    CREATE_EDUCATION_PLAN_IN_DIRECTION = 'CREATE_EDUCATION_PLAN_IN_DIRECTION',
}

export enum EducationPlanInDirectionFields {
    ID = 'id',
    DIRECTION = 'field_of_study',
    EDUCATION_PLAN = 'academic_plan',
    YEAR = 'year',
}