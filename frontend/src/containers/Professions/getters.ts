import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {fields} from './enum';

import {professionsState, ProfessionType, SkillType} from './types';
import {Types} from "../../components/SortingButton/types";

const getStateData = (state: rootState): professionsState => get(state, GENERAL_PATH);
export const getProfessionsList = (state: rootState): Array<ProfessionType> => get(getStateData(state), fields.PROFESSIONS_LIST, []);
export const getSkillsList = (state: rootState): Array<SkillType> => get(getStateData(state), fields.SKILLS_LIST, []);
export const getProfession = (state: rootState): ProfessionType|{} => get(getStateData(state), fields.PROFESSION, {});

export const getProfessionsDialog = (state: rootState) => get(getStateData(state), fields.PROFESSIONS_DIALOG, {});

export const isOpenDialog = (state: rootState) => get(getProfessionsDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDialogData = (state: rootState) => get(getProfessionsDialog(state), fields.DIALOG_DATA, false);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');
export const getFilteredRole = (state: rootState) => get(getStateData(state), fields.ROLE, null);

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, Types.ASC);
