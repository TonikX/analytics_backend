import {MergeWorkProgramsActions} from "./types";
import {createAction} from "@reduxjs/toolkit";

const getWorkProgramsList = createAction('GET_WORK_PROGRAMS_LIST');
const setWorkProgramsList = createAction('SET_WORK_PROGRAMS_LIST');
const mergeWorkPrograms = createAction('MERGE_WORK_PROGRAM');

const actions: MergeWorkProgramsActions = {
    getWorkProgramsList,
    setWorkProgramsList,
    mergeWorkPrograms
}

export default actions;