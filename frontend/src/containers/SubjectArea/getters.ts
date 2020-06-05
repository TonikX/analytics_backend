import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {fields, SubjectAreaFields} from './enum';

import {subjectAreaState, SubjectAreaType} from './types';

const getStateData = (state: rootState): subjectAreaState => get(state, GENERAL_PATH);
export const getSubjectAreaList = (state: rootState): Array<SubjectAreaType> => get(getStateData(state), fields.SUBJECT_AREA_LIST, []);

export const getSubjectAreaListForSelect = (state: rootState) => {
    const allSubjectArea = getSubjectAreaList(state);

    return allSubjectArea.map((area: any) => ({
        label: area[SubjectAreaFields.TITLE],
        value: area[SubjectAreaFields.ID],
    }))
};

export const getSubjectAreaDialog = (state: rootState) => get(getStateData(state), fields.SUBJECT_AREA_DIALOG, {});

export const isOpenDialog = (state: rootState) => get(getSubjectAreaDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDialogData = (state: rootState) => get(getSubjectAreaDialog(state), fields.DIALOG_DATA, false);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, '');