import {createAction} from "@reduxjs/toolkit";

import {CoursesActions} from './types';

const getCourses = createAction<string>('GET_COURSES');
const setCourses = createAction<string>('SET_COURSES');

const createNewCourse = createAction<string>('CREATE_NEW_COURSE');
const changeCourse = createAction<string>('CHANGE_COURSE');
const deleteCourse = createAction<string>('DELETE_COURSE');

const openDialog = createAction<string>('OPEN_COURSE_DIALOG');
const closeDialog = createAction<string>('CLOSE_COURSE_DIALOG');

const changeSearchQuery = createAction<string>('COURSES_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction<string>('COURSES_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction<string>('COURSES_CHANGE_ALL_COUNT');
const changeSorting = createAction<string>('COURSES_CHANGE_SORTING');

const actions: CoursesActions = {
    getCourses,
    setCourses,
    createNewCourse,
    changeCourse,
    deleteCourse,
    openDialog,
    closeDialog,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;