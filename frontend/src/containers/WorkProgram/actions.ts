import {createAction} from "@reduxjs/toolkit";

import {WorkProgramActions} from './types';

const getWorkProgram = createAction<string>('GET_WORK_PROGRAM');
const setWorkProgram = createAction<string>('SET_WORK_PROGRAM');
const setWorkProgramId = createAction<string>('SET_WORK_PROGRAM_ID');
const saveWorkProgram = createAction<string>('SAVE_WORK_PROGRAM');
const setWorkProgramPart = createAction<string>('SET_WORK_PROGRAM_PART');

const cloneWorkProgram = createAction<string>('CLONE_WORK_PROGRAM');

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

const deletePrerequisite = createAction<string>('WORK_PROGRAM_DELETE_PREREQUISITE');
const addPrerequisite = createAction<string>('WORK_PROGRAM_ADD_PREREQUISITE');
const changePrerequisite = createAction<string>('WORK_PROGRAM_CHANGE_PREREQUISITE');

const deleteResult = createAction<string>('WORK_PROGRAM_DELETE_RESULT');
const addResult = createAction<string>('WORK_PROGRAM_ADD_RESULT');
const changeResult = createAction<string>('WORK_PROGRAM_CHANGE_RESULT');
const getResults = createAction<string>('WORK_PROGRAM_GET_RESULTS');
const setResults = createAction<string>('WORK_PROGRAM_SET_RESULTS');

const getWorkProgramEvaluationTools = createAction<string>('GET_WORK_PROGRAM_EVALUATION_TOOLS');
const setWorkProgramEvaluationTools = createAction<string>('SET_WORK_PROGRAM_EVALUATION_TOOLS');

const deleteEvaluationTool = createAction<string>('WORK_PROGRAM_DELETE_EVALUATION_TOOL');
const addEvaluationTool = createAction<string>('WORK_PROGRAM_ADD_EVALUATION_TOOL');
const changeEvaluationTool = createAction<string>('WORK_PROGRAM_CHANGE_EVALUATION_TOOL');

const pageDown = createAction<string>('WORK_PROGRAM_PAGE_DOWN');

const actions: WorkProgramActions = {
    pageDown,

    cloneWorkProgram,

    getResults,
    setResults,
    deleteResult,
    addResult,
    changeResult,

    getWorkProgramEvaluationTools,
    setWorkProgramEvaluationTools,

    deleteEvaluationTool,
    addEvaluationTool,
    changeEvaluationTool,

    deletePrerequisite,
    addPrerequisite,
    changePrerequisite,

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
