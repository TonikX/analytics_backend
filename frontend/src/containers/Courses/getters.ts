import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {CourseFields, fields, InstitutionFields, PlatformFields} from './enum';

import {coursesState, CourseType, PlatformType, InstitutionType} from './types';
import {SelectorListType} from "../../components/SearchSelector/types";

const getStateData = (state: rootState): coursesState => get(state, GENERAL_PATH);
export const getCourses = (state: rootState): Array<CourseType> => get(getStateData(state), fields.COURSES_LIST, []);

export const getCoursesForSelector = (state: rootState): SelectorListType =>
    getCourses(state).map((course: any) => ({
        value: course[CourseFields.ID],
        label: course[CourseFields.TITLE],
    }))

export const getCourseDialog = (state: rootState) => get(getStateData(state), fields.COURSE_DIALOG, {});

export const isOpenDialog = (state: rootState) => get(getCourseDialog(state), fields.IS_OPEN_DIALOG, false);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, '');

export const getPlatforms = (state: rootState) => get(getStateData(state), fields.PLATFORMS, [])
export const getIntitutions = (state: rootState) => get(getStateData(state), fields.INSTITUTIONS, [])