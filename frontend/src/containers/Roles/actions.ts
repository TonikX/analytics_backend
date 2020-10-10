import {createAction} from "@reduxjs/toolkit";

import {RolesActions} from './types';

const getRolesList = createAction<string>('GET_ROLES');
const setRolesList = createAction<string>('SET_ROLES');

const getRole = createAction<string>('GET_ROLE');
const setRole = createAction<string>('SET_ROLE');

const createNewRole = createAction<string>('CREATE_NEW_ROLES');
const changeRole = createAction<string>('CHANGE_ROLE');
const deleteRole = createAction<string>('DELETE_ROLE');

const openDialog = createAction<string>('OPEN_ROLES_DIALOG');
const closeDialog = createAction<string>('CLOSE_ROLES_DIALOG');

const getSkills = createAction<string>('ROLE_GET_SKILLS');
const setSkills = createAction<string>('ROLE_SET_SKILLS');
const createSkill = createAction<string>('ROLE_CREATE_SKILL');
const changeSkill = createAction<string>('ROLE_CHANGE_SKILL');
const deleteSkill = createAction<string>('ROLE_DELETE_SKILL');

const changeSearchQuery = createAction<string>('ROLES_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction<string>('ROLES_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction<string>('ROLES_CHANGE_ALL_COUNT');
const changeSorting = createAction<string>('ROLES_CHANGE_SORTING');
const changeFilteredRole = createAction<string>('ROLES_CHANGE_FILTERED_ROLE');

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