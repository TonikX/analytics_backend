import {createAction} from "@reduxjs/toolkit";

import {CoursesActions} from './types';

const getCourses = createAction('GET_COURSES');
const setCourses = createAction('SET_COURSES');

const getPlatforms = createAction('GET_PLATFORMS')
const setPlatforms = createAction('SET_PLATFORMS')

const getInstitutions = createAction('GET_INSTITUTIONS')
const setInstitutions = createAction('SET_INSTITUTIONS')

const createNewCourse = createAction('CREATE_NEW_COURSE');
const changeCourse = createAction('CHANGE_COURSE');
const deleteCourse = createAction('DELETE_COURSE');

const openDialog = createAction('OPEN_COURSE_DIALOG');
const closeDialog = createAction('CLOSE_COURSE_DIALOG');
const changeDialogStep = createAction('CHANGE_DIALOG_STEP')

const changeSearchQuery = createAction('COURSES_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('COURSES_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('COURSES_CHANGE_ALL_COUNT');
const changeSorting = createAction('COURSES_CHANGE_SORTING');
const changeFiltering = createAction('COURSES_CHANGE_FILTERING')
const changeFilterSearchQuery = createAction('COURSES_CHANGE_FILTER_SEARCH_QUERY')

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
    changeDialogStep,
    getPlatforms,
    setPlatforms,
    getInstitutions,
    setInstitutions,
    changeFiltering,
    changeFilterSearchQuery,
}

export default actions;