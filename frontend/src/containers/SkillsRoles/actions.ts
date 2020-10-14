import {createAction} from "@reduxjs/toolkit";

import {RolesActions} from './types';

const getRolesList = createAction<string>('GET_SKILLS_ROLES');
const setRolesList = createAction<string>('SET_SKILLS_ROLES');

const changeSearchQuery = createAction<string>('SKILLS_ROLES_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction<string>('SKILLS_ROLES_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction<string>('SKILLS_ROLES_CHANGE_ALL_COUNT');
const changeSorting = createAction<string>('SKILLS_ROLES_CHANGE_SORTING');
const changeFilteredRole = createAction<string>('SKILLS_ROLES_CHANGE_FILTERED_ROLE');

const actions: RolesActions = {
    changeFilteredRole,
    getRolesList,
    setRolesList,

    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;