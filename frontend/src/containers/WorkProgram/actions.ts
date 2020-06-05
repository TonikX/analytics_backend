import {createAction} from "@reduxjs/toolkit";

import {WorkProgramActions} from './types';

const getWorkProgram = createAction<string>('GET_WORK_PROGRAM');
const setWorkProgram = createAction<string>('SET_WORK_PROGRAM');
const setWorkProgramId = createAction<string>('SET_WORK_PROGRAM_ID');
const saveWorkProgram = createAction<string>('SAVE_WORK_PROGRAM');
const setWorkProgramPart = createAction<string>('SET_WORK_PROGRAM_PART');

const saveSection = createAction<string>('WORK_PROGRAM_SAVE_SECTION');
const deleteSection = createAction<string>('WORK_PROGRAM_DELETE_SECTION');
const changeSectionNumber = createAction<string>('WORK_PROGRAM_CHANGE_SECTION_NUMBER');

const saveTopic = createAction<string>('WORK_PROGRAM_SAVE_TOPIC');
const deleteTopic = createAction<string>('WORK_PROGRAM_DELETE_TOPIC');
const changeTopicNumber = createAction<string>('WORK_PROGRAM_CHANGE_TOPIC_NUMBER');

const openDialog = createAction<string>('WORK_PROGRAM_OPEN_DIALOG');
const closeDialog = createAction<string>('WORK_PROGRAM_CLOSE_DIALOG')

const deleteLiterature = createAction<string>('WORK_PROGRAM_DELETE_LITERATURE');
const addLiterature = createAction<string>('WORK_PROGRAM_ADD_LITERATURE');

const actions: WorkProgramActions = {
    getWorkProgram,
    setWorkProgram,
    setWorkProgramId,
    setWorkProgramPart,
    saveWorkProgram,

    saveSection,
    deleteSection,
    changeSectionNumber,

    saveTopic,
    deleteTopic,
    changeTopicNumber,

    openDialog,
    closeDialog,

    deleteLiterature,
    addLiterature,
}

export default actions;
