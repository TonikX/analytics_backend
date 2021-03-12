export enum fields {
    COURSES_LIST = 'COURSES_LIST',
    COURSE_DIALOG = 'COURSE_DIALOG',
    IS_OPEN_DIALOG = 'IS_OPEN_DIALOG',
    DIALOG_DATA = 'DIALOG_DATA',
    SEARCH_QUERY = 'SEARCH_QUERY',
    CURRENT_PAGE = 'CURRENT_PAGE',
    ALL_COUNT = 'ALL_COUNT',
    SORTING = 'SORTING',
    SORTING_FIELD = 'SORTING_FIELD',
    SORTING_MODE = 'SORTING_MODE',
    PLATFORMS = 'PLATFORMS',
    INSTITUTIONS = 'INSTITUTIONS',
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
    COURSE_URL = 'course_url',
    PLATFORM_ID = 'platform',
    INSTITUTION_ID = 'institution',
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

export enum Language {
    
}