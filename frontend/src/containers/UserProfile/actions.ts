import {userProfileActions} from "./types";
import {createAction} from "@reduxjs/toolkit";

const getUserWorkProgramsList = createAction('GET_USER_WORK_PROGRAMS_LIST');
const setUserWorkProgramsList = createAction('SET_USER_WORK_PROGRAMS_LIST');
const changeCurrentPage = createAction('CHANGE_CURRENT_PAGE')
const changeAllCount = createAction('CHANGE_ALL_COUNT')

const actions: userProfileActions = {
    getUserWorkProgramsList,
    setUserWorkProgramsList,
    changeAllCount,
    changeCurrentPage,
}

export default actions;
