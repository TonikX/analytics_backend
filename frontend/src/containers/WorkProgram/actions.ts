import {createAction} from "@reduxjs/toolkit";

import {WorkProgramActions} from './types';

const getWorkProgram = createAction<string>('GET_WORK_PROGRAM');
const setWorkProgram = createAction<string>('SET_WORK_PROGRAM');
const setWorkProgramId = createAction<string>('SET_WORK_PROGRAM_ID');
const saveWorkProgram = createAction<string>('SAVE_WORK_PROGRAM');

const saveSection = createAction<string>('SAVE_SECTION');
const deleteSection = createAction<string>('DELETE_SECTION');

const actions: WorkProgramActions = {
    getWorkProgram,
    setWorkProgram,
    setWorkProgramId,
    saveWorkProgram,
    saveSection,
    deleteSection,
}

export default actions;
