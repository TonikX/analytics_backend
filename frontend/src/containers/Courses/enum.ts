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
    FIELDS_OF_STUDY_NUMBERS = 'FIELDS_OF_STUDY_NUMBERS',
    FIELDS_OF_STUDY_TITLES = 'FIELDS_OF_STUDY_TITLES',
}

export enum filterFields {
    FILTERING_PLATFORM = 'FILTERING_PLATFORM',
    FILTERING_INSTITUTION = 'FILTERING_INSTITUTION',
    FILTERING_LANGUAGE = 'FILTERING_LANGUAGE',
    FILTERING_FIELD_OF_STUDY_TITLE = 'FILTERING_FIELD_OF_STUDY_TITLE',
    FILTERING_FIELD_OF_STUDY_NUMBER = 'FILTERING_FIELD_OF_STUDY_NUMBER',
    FILTERING_SEARCH_QUERY = 'FILTERING_SEARCH_QUERY',
}

export enum fetchingTypes {
    GET_COURSES = 'GET_COURSES',
    DELETE_COURSE = 'DELETE_COURSE',
    UPDATE_COURSE = 'UPDATE_COURSE',
    CREATE_COURSE = 'CREATE_COURSE',
    GET_PLATFORMS = 'GET_PLATFORMS',
    GET_INSTITUTIONS = 'GET_INSTITUTIONS',
    GET_FIELDS_OF_STUDY = 'GET_FIELDS_OF_STUDY',
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

export enum CourseSortingFields {
    TITLE = 'title',
    PLATFORM_TITLE = 'platform__title',
    INSTITUTION_TITLE = 'institution__title',
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

export enum FieldOfStudyFields {
    ID = 'id',
    NUMBER = 'number',
    TITLE = 'title',
}