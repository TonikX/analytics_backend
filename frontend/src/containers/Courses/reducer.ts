import createReducer from "../../store/createReducer";
import {fields, filterFields} from './enum';
import actions from "./actions";

import {coursesState} from "./types";

export const GENERAL_PATH = 'courses';

export const initialState: coursesState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.FILTERING]: {
        [filterFields.FILTERING_PLATFORM]: '',
        [filterFields.FILTERING_INSTITUTION]: '',
        [filterFields.FILTERING_LANGUAGE]: '',
        [filterFields.FILTERING_SEARCH_QUERY]: '',
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: '',
    [fields.COURSES_LIST]: [],
    [fields.COURSE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
    },
    [fields.PLATFORMS]: [],
    [fields.INSTITUTIONS]: [],
    [fields.FIELDS_OF_STUDY]: [],
};

const setCourses = (state: coursesState, {payload}: any): coursesState => ({
    ...state,
    [fields.COURSES_LIST]: payload,
});

const changeSearchQuery = (state: coursesState, {payload}: any): coursesState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: coursesState, {payload}: any): coursesState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: coursesState, {payload}: any): coursesState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const openDialog = (state: coursesState): coursesState => ({
    ...state,
    [fields.COURSE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
    }
});

const closeDialog = (state: coursesState): coursesState => ({
    ...state,
    [fields.COURSE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
    }
});

const changeSorting = (state: coursesState, {payload}: any): coursesState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

const changeFiltering = (state: coursesState, {payload}: any): coursesState => ({
    ...state,
    [fields.FILTERING]: {
        [filterFields.FILTERING_PLATFORM]: payload.platform,
        [filterFields.FILTERING_INSTITUTION]: payload.institution,
        [filterFields.FILTERING_LANGUAGE]: payload.language,
        [filterFields.FILTERING_SEARCH_QUERY]: state[fields.FILTERING][filterFields.FILTERING_SEARCH_QUERY],
    }
})

const changeFilterSearchQuery = (state: coursesState, {payload}: any): coursesState => ({
    ...state,
    [fields.FILTERING]: {
        [filterFields.FILTERING_PLATFORM]: state[fields.FILTERING][filterFields.FILTERING_PLATFORM],
        [filterFields.FILTERING_INSTITUTION]: state[fields.FILTERING][filterFields.FILTERING_INSTITUTION],
        [filterFields.FILTERING_LANGUAGE]: state[fields.FILTERING][filterFields.FILTERING_LANGUAGE],
        [filterFields.FILTERING_SEARCH_QUERY]: payload,
    }
})

const setPlatforms = (state: coursesState, {payload}: any): coursesState => ({
    ...state,
    [fields.PLATFORMS]: payload
})

const setInstitutions = (state: coursesState, {payload}: any): coursesState => ({
    ...state,
    [fields.INSTITUTIONS]: payload
})

export const reducer = createReducer(initialState, {
    [actions.setCourses.type]: setCourses,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
    [actions.setPlatforms.type]: setPlatforms,
    [actions.setInstitutions.type]: setInstitutions,
    [actions.changeFiltering.type]: changeFiltering,
    [actions.changeFilterSearchQuery.type]: changeFilterSearchQuery,
});