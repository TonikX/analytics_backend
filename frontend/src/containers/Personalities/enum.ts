export enum fields {
    PERSONALITIES_LIST = 'PERSONALITIES_LIST',
    SEARCH_QUERY = 'SEARCH_QUERY',
    CURRENT_PAGE = 'CURRENT_PAGE',
    ALL_COUNT = 'ALL_COUNT',
    SORTING = 'SORTING',
    SORTING_FIELD = 'SORTING_FIELD',
    FILTERING = 'FILTERING',
    SORTING_MODE = 'SORTING_MODE',
}

export enum filterFields {
    FILTERING_SEARCH_QUERY = 'FILTERING_SEARCH_QUERY',
    FILTERING_GROUPS = 'FILTERING_GROUPS'
}

export enum fetchingTypes {
    GET_PERSONALITIES = 'GET_PERSONALITIES',
    DELETE_PERSONALITY = 'DELETE_PERSONALITY',
    UPDATE_PERSONALITY = 'UPDATE_PERSONALITY',
    CREATE_PERSONALITY = 'CREATE_PERSONALITY',
}

export enum PersonalityFields {
    ID = 'id',
    USERNAME = 'username',
    FIRST_NAME = 'first_name',
    LAST_NAME = 'last_name',
    EMAIL = 'email',
    ISU_NUMBER = 'isu_number',
    GROUPS = 'groups'
}

export enum GroupFields {
    ID = 'id',
    NAME = 'name',
    PERMISIIONS = 'permissions'
}

export enum PersonalitySortingFields {
    LAST_NAME = 'last_name',
    ISU_NUMBER = 'isu_number'
}
