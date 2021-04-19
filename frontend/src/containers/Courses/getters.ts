import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {CourseFields, fields, filterFields} from './enum';

import {coursesState, CourseType, PlatformType, InstitutionType, filteringType, FieldOfStudyType} from './types';
import {SelectorListType} from "../../components/SearchSelector/types";
import {SortingType} from "../../components/SortingButton/types";

const getStateData = (state: rootState): coursesState => get(state, GENERAL_PATH);
export const getCourses = (state: rootState): Array<CourseType> => get(getStateData(state), fields.COURSES_LIST, []);

export const getCoursesForSelector = (state: rootState): SelectorListType =>
    getCourses(state).map((course: any) => ({
        value: course[CourseFields.ID],
        label: course[CourseFields.TITLE],
    }))

export const getCourseDialog = (state: rootState) => get(getStateData(state), fields.COURSE_DIALOG, {});

export const isOpenDialog = (state: rootState): boolean => get(getCourseDialog(state), fields.IS_OPEN_DIALOG, false);

export const getAllCount = (state: rootState): number => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState): number => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState): string => get(getStateData(state), fields.SEARCH_QUERY, '');

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState): string => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState): SortingType => get(getSorting(state), fields.SORTING_MODE, '');

export const getFilters = (state: rootState): filteringType => get(getStateData(state), fields.FILTERING)
export const getFilterSearchQuery = (state: rootState): string => get(getFilters(state), filterFields.FILTERING_SEARCH_QUERY, '')

export const getPlatforms = (state: rootState): Array<PlatformType> => get(getStateData(state), fields.PLATFORMS, [])
export const getIntitutions = (state: rootState): Array<InstitutionType> => get(getStateData(state), fields.INSTITUTIONS, [])
export const getFieldsOfStudy = (state: rootState): Array<FieldOfStudyType> => get(getStateData(state), fields.FIELDS_OF_STUDY, [])
