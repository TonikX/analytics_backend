import {createAction} from "@reduxjs/toolkit";

import {RolesActions} from './types';

const getRolesList = createAction('GET_ROLES');
const setRolesList = createAction('SET_ROLES');

const getRole = createAction('GET_ROLE');
const setRole = createAction('SET_ROLE');

const createNewRole = createAction('CREATE_NEW_ROLES');
const changeRole = createAction('CHANGE_ROLE');
const deleteRole = createAction('DELETE_ROLE');

const openDialog = createAction('OPEN_ROLES_DIALOG');
const closeDialog = createAction('CLOSE_ROLES_DIALOG');

const getSkills = createAction('ROLE_GET_SKILLS');
const setSkills = createAction('ROLE_SET_SKILLS');
const createSkill = createAction('ROLE_CREATE_SKILL');
const changeSkill = createAction('ROLE_CHANGE_SKILL');
const deleteSkill = createAction('ROLE_DELETE_SKILL');

const changeSearchQuery = createAction('ROLES_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('ROLES_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('ROLES_CHANGE_ALL_COUNT');
const changeSorting = createAction('ROLES_CHANGE_SORTING');
const changeFilteredRole = createAction('ROLES_CHANGE_FILTERED_ROLE');

const actions: RolesActions = {
    getRole,
    setRole,

    changeFilteredRole,
    getRolesList,
    setRolesList,
    createNewRole,
    changeRole,
    deleteRole,
    openDialog,
    closeDialog,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
    getSkills,
    setSkills,
    createSkill,
    changeSkill,
    deleteSkill,
}

export default actions;