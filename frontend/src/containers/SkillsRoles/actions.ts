import {createAction} from "@reduxjs/toolkit";

import {RolesActions} from './types';

const getRolesList = createAction('GET_SKILLS_ROLES');
const setRolesList = createAction('SET_SKILLS_ROLES');

const changeSearchQuery = createAction('SKILLS_ROLES_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('SKILLS_ROLES_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('SKILLS_ROLES_CHANGE_ALL_COUNT');
const changeSorting = createAction('SKILLS_ROLES_CHANGE_SORTING');
const changeFilteredRole = createAction('SKILLS_ROLES_CHANGE_FILTERED_ROLE');

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
