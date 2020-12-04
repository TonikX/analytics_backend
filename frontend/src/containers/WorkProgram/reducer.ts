import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {workProgramState} from "./types";

export const GENERAL_PATH = 'workProgram';

export const initialState: workProgramState = {
    [fields.WORK_PROGRAM]: {
        [fields.WORK_PROGRAM_SECTIONS]: []
    },
    [fields.WORK_PROGRAM_ID]: '',
    [fields.WORK_PROGRAM_EVALUATION_TOOLS]: [],
    [fields.WORK_PROGRAM_INTERMEDIATE_CERTIFICATION]: [],
    [fields.WORK_PROGRAM_RESULTS]: [],
    [fields.WORK_PROGRAM_COMMENTS]: [],
    [fields.DIALOGS]: {
        [fields.CREATE_NEW_TOPIC_DIALOG]: {
            [fields.IS_OPEN_DIALOG]: false,
            [fields.DIALOG_DATA]: {},
        }
    },
};

const setWorkProgramPart = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    [fields.WORK_PROGRAM]: {
        ...state[fields.WORK_PROGRAM],
        ...payload
    }
});

const setWorkProgram = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    [fields.WORK_PROGRAM]: payload
});

const setWorkProgramId = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    [fields.WORK_PROGRAM_ID]: payload
});

const setWorkProgramEvaluationTools = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    [fields.WORK_PROGRAM_EVALUATION_TOOLS]: payload
});

const setComments = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    [fields.WORK_PROGRAM_COMMENTS]: payload
});

const setResults = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    [fields.WORK_PROGRAM_RESULTS]: payload
});

const openDialog = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    [fields.DIALOGS]: {
        ...state[fields.DIALOGS],
        [payload.dialogType]: {
            [fields.IS_OPEN_DIALOG]: true,
            [fields.DIALOG_DATA]: payload.data
        }
    }
});

const closeDialog = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    [fields.DIALOGS]: {
        ...state[fields.DIALOGS],
        [payload]: {
            [fields.IS_OPEN_DIALOG]: false,
            [fields.DIALOG_DATA]: {}
        }
    }
});

const pageDown = (): workProgramState => initialState;

export const reducer = createReducer(initialState, {
    [actions.setWorkProgramPart.type]: setWorkProgramPart,
    [actions.setWorkProgram.type]: setWorkProgram,
    [actions.setWorkProgramId.type]: setWorkProgramId,

    [actions.setResults.type]: setResults,

    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,

    [actions.setComments.type]: setComments,

    [actions.setWorkProgramEvaluationTools.type]: setWorkProgramEvaluationTools,
    [actions.pageDown.type]: pageDown,
});