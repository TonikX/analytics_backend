import {createAction} from "@reduxjs/toolkit";

import {ProfessionsActions} from './types';

const getProfessionsList = createAction('GET_PROFESSIONS');
const setProfessionsList = createAction('SET_PROFESSIONS');

const getProfession = createAction('GET_PROFESSION');
const setProfession = createAction('SET_PROFESSION');

const createNewProfession = createAction('CREATE_NEW_PROFESSIONS');
const changeProfession = createAction('CHANGE_PROFESSION');
const deleteProfession = createAction('DELETE_PROFESSION');

const openDialog = createAction('OPEN_PROFESSIONS_DIALOG');
const closeDialog = createAction('CLOSE_PROFESSIONS_DIALOG');

const getSkills = createAction('PROFESSION_GET_SKILLS');
const setSkills = createAction('PROFESSION_SET_SKILLS');
const createSkill = createAction('PROFESSION_CREATE_SKILL');
const changeSkill = createAction('PROFESSION_CHANGE_SKILL');
const deleteSkill = createAction('PROFESSION_DELETE_SKILL');

const changeSearchQuery = createAction('PROFESSIONS_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('PROFESSIONS_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('PROFESSIONS_CHANGE_ALL_COUNT');
const changeSorting = createAction('PROFESSIONS_CHANGE_SORTING');
const changeFilteredRole = createAction('PROFESSIONS_CHANGE_FILTERED_ROLE');

const actions: ProfessionsActions = {
    getProfession,
    setProfession,

    changeFilteredRole,
    getProfessionsList,
    setProfessionsList,
    createNewProfession,
    changeProfession,
    deleteProfession,
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