import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {coursesState} from "./types";

export const GENERAL_PATH = 'courses';

export const initialState: coursesState = {
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: '',
    [fields.COURSES_LIST]: [],
    [fields.COURSE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
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

const openDialog = (state: coursesState, {payload}: any): coursesState => ({
    ...state,
    [fields.COURSE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const closeDialog = (state: coursesState): coursesState => ({
    ...state,
    [fields.COURSE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
});

export const reducer = createReducer(initialState, {
    [actions.setCourses.type]: setCourses,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
});