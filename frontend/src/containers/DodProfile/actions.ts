import {dodProfileActions} from "./types";
import {createAction} from "@reduxjs/toolkit";

const getDodWorkProgramsList = createAction('GET_DOD_WORK_PROGRAMS_LIST');
const setDodWorkProgramsList = createAction('SET_DOD_WORK_PROGRAMS_LIST');
const changeAllCount = createAction('CHANGE_ALL_COUNT')
const changeCurrentPage = createAction('CHANGE_CURRENT_PAGE')
const changeTableMode = createAction('CHANGE_TABLE_MODE')


const actions: dodProfileActions = {
    getDodWorkProgramsList,
    setDodWorkProgramsList,
    changeAllCount,
    changeCurrentPage,
    changeTableMode,
}

export default actions;