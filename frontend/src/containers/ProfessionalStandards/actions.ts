import {createAction} from "@reduxjs/toolkit";

import {ProfessionalStandardsActions} from './types';

const getProfessionalStandards = createAction('GET_PROFESSIONAL_STANDARDS');
const setProfessionalStandards = createAction('SET_PROFESSIONAL_STANDARDS');

const createNewProfessionalStandard = createAction('CREATE_NEW_PROFESSIONAL_STANDARD');
const changeProfessionalStandard = createAction('CHANGE_PROFESSIONAL_STANDARD');
const deleteProfessionalStandard = createAction('DELETE_PROFESSIONAL_STANDARD');

const openDialog = createAction('OPEN_PROFESSIONAL_STANDARDS_DIALOG');
const closeDialog = createAction('CLOSE_PROFESSIONAL_STANDARDS_DIALOG');

const changeSearchQuery = createAction('PROFESSIONAL_STANDARDS_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('PROFESSIONAL_STANDARDS_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('PROFESSIONAL_STANDARDS_CHANGE_ALL_COUNT');
const changeSorting = createAction('PROFESSIONAL_STANDARDS_CHANGE_SORTING');

const actions: ProfessionalStandardsActions = {
    getProfessionalStandards,
    setProfessionalStandards,
    createNewProfessionalStandard,
    changeProfessionalStandard,
    deleteProfessionalStandard,
    openDialog,
    closeDialog,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;