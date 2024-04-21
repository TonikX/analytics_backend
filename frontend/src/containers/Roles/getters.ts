import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {fields} from './enum';

import {rolesState, RoleType, SkillType} from './types';
import {Types} from "../../components/SortingButton/types";

const getStateData = (state: rootState): rolesState => get(state, GENERAL_PATH);
export const getRolesList = (state: rootState): Array<RoleType> => get(getStateData(state), fields.ROLES_LIST, []);
export const getSkillsList = (state: rootState): Array<SkillType> => get(getStateData(state), fields.SKILLS_LIST, []);
// @ts-ignore
export const getRole = (state: rootState): RoleType|{} => get(getStateData(state), fields.ROLE, {});

export const getRolesDialog = (state: rootState) => get(getStateData(state), fields.ROLES_DIALOG, {});

export const isOpenDialog = (state: rootState) => get(getRolesDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDialogData = (state: rootState) => get(getRolesDialog(state), fields.DIALOG_DATA, false);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');
export const getFilteredRole = (state: rootState) => get(getStateData(state), fields.ROLE, null);

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, Types.ASC);
