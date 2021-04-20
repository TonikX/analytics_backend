export enum fields {
    INDIVIDUAL_TRAJECTORIES = 'INDIVIDUAL_TRAJECTORIES',
    SEARCH_QUERY = 'SEARCH_QUERY',
    CURRENT_PAGE = 'CURRENT_PAGE',
    ALL_COUNT = 'ALL_COUNT',
    SORTING = 'SORTING',
    SORTING_FIELD = 'SORTING_FIELD',
    SORTING_MODE = 'SORTING_MODE',
    SHOW_ONLY_MY = 'SHOW_ONLY_MY',
    FILTERING = 'FILTERING',
}

export enum fetchingTypes {
    GET_INDIVIDUAL_TRAJECTORIES = 'GET_INDIVIDUAL_TRAJECTORIES',
    DELETE_INDIVIDUAL_TRAJECTORY = 'DELETE_INDIVIDUAL_TRAJECTORY',
}

export enum IndividualTrajectoryFields {
    ID = 'id',
    DIRECTION = 'field_of_study',
    EDUCATION_PLAN = 'academic_plan',
    YEAR = 'year',
    NUMBER = 'number',
    USER = 'user',
    IMPLEMENTATION_OF_ACADEMIC_PLAN = 'implementation_of_academic_plan',
}

export enum filterFields{
    LANGUAGE = 'LANGUAGE',
    NUMBER_OP = 'NUMBER_OP',
    NAME_OP = 'NAME_OP',
    SPECIALIZATION = 'SPECIALIZATION',
}