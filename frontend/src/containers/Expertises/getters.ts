import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {ExpertisesFields, fields} from './enum';

import {expertisesState, ExpertiseType} from './types';
import {WorkProgramStatusType} from "../WorkProgram/types";
import {Types} from "../../components/SortingButton/types";

const getStateData = (state: rootState): expertisesState => get(state, GENERAL_PATH);
export const getExpertisesList = (state: rootState): Array<ExpertiseType> => get(getStateData(state), fields.EXPERTISES_LIST, []);

export const getExpertise = (state: rootState): ExpertiseType|{} => get(getStateData(state), fields.EXPERTISE, {});
export const getSelectedStatus = (state: rootState): WorkProgramStatusType|'' => get(getStateData(state), fields.SELECTED_STATUS, '');
export const getSelectedQualification = (state: rootState): string => get(getStateData(state), fields.SELECTED_QUALIFICATION, '');
export const getExpertiseId = (state: rootState): number => get(getExpertise(state), ExpertisesFields.ID);

export const getIsOpenAddExpertModal = (state: rootState): any => get(getStateData(state), fields.IS_OPEN_ADD_EXPERT_MODAL, false);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, Types.ASC);

export const getComments = (state: rootState) => get(getSorting(state), fields.COMMENTS, []);