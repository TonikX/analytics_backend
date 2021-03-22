export enum fields {
    COURSES_LIST = 'COURSES_LIST',
    COURSE_DIALOG = 'COURSE_DIALOG',
    IS_OPEN_DIALOG = 'IS_OPEN_DIALOG',
    SEARCH_QUERY = 'SEARCH_QUERY',
    CURRENT_PAGE = 'CURRENT_PAGE',
    ALL_COUNT = 'ALL_COUNT',
    SORTING = 'SORTING',
    SORTING_FIELD = 'SORTING_FIELD',
    SORTING_MODE = 'SORTING_MODE',
    FILTERING = 'FILTERING',
    PLATFORMS = 'PLATFORMS',
    INSTITUTIONS = 'INSTITUTIONS',
}

export enum filterFields {
    FILTERING_PLATFORM = 'FILTERING_PLATFORM',
    FILTERING_INSTITUTION = 'FILTERING_INSTITUTION',
    FILTERING_LANGUAGE = 'FILTERING_LANGUAGE',
    FILTERING_SEARCH_QUERY = 'FILTERING_SEARCH_QUERY',
}

export enum fetchingTypes {
    GET_COURSES = 'GET_COURSES',
    DELETE_COURSE = 'DELETE_COURSE',
    UPDATE_COURSE = 'UPDATE_COURSE',
    CREATE_COURSE = 'CREATE_COURSE',
    GET_PLATFORMS = 'GET_PLATFORMS',
    GET_INSTITUTIONS = 'GET_INSTITUTIONS',
}

export enum CourseFields {
    ID = 'id',
    TITLE = 'title',
    DESCRIPTION = 'description',
    COURSE_URL = 'external_url',
    PLATFORM = 'platform',
    INSTITUTION = 'institution',
    LANGUAGE = 'language',
    STARTED_AT = 'started_at',
    RATING = 'rating',
}

export enum PlatformFields {
    ID = 'id',
    TITLE = 'title',
}

export enum InstitutionFields {
    ID = 'id',
    TITLE = 'title',
}