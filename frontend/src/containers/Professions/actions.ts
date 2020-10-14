import {createAction} from "@reduxjs/toolkit";

import {ProfessionsActions} from './types';

const getProfessionsList = createAction<string>('GET_PROFESSIONS');
const setProfessionsList = createAction<string>('SET_PROFESSIONS');

const getProfession = createAction<string>('GET_PROFESSION');
const setProfession = createAction<string>('SET_PROFESSION');

const createNewProfession = createAction<string>('CREATE_NEW_PROFESSIONS');
const changeProfession = createAction<string>('CHANGE_PROFESSION');
const deleteProfession = createAction<string>('DELETE_PROFESSION');

const openDialog = createAction<string>('OPEN_PROFESSIONS_DIALOG');
const closeDialog = createAction<string>('CLOSE_PROFESSIONS_DIALOG');

const getSkills = createAction<string>('PROFESSION_GET_SKILLS');
const setSkills = createAction<string>('PROFESSION_SET_SKILLS');
const createSkill = createAction<string>('PROFESSION_CREATE_SKILL');
const changeSkill = createAction<string>('PROFESSION_CHANGE_SKILL');
const deleteSkill = createAction<string>('PROFESSION_DELETE_SKILL');

const changeSearchQuery = createAction<string>('PROFESSIONS_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction<string>('PROFESSIONS_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction<string>('PROFESSIONS_CHANGE_ALL_COUNT');
const changeSorting = createAction<string>('PROFESSIONS_CHANGE_SORTING');
const changeFilteredRole = createAction<string>('PROFESSIONS_CHANGE_FILTERED_ROLE');

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