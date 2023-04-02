import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {workProgramState} from "./types";

export const GENERAL_PATH = 'workProgram';

export const initialState: workProgramState = {
    [fields.WORK_PROGRAM]: {
        [fields.WORK_PROGRAM_SECTIONS]: []
    },
    [fields.WORK_PROGRAM_EVALUATION_TOOLS]: [],
    [fields.WORK_PROGRAM_EVALUATION_TOOL]: {},
    [fields.WORK_PROGRAM_INTERMEDIATE_CERTIFICATION_TOOLS]: [],
    [fields.WORK_PROGRAM_INTERMEDIATE_CERTIFICATION_TOOL]: {},
    [fields.WORK_PROGRAM_RESULTS]: [],
    [fields.WORK_PROGRAM_COMMENTS]: [],
    [fields.DIALOGS]: {
        [fields.CREATE_NEW_TOPIC_DIALOG]: {
            [fields.IS_OPEN_DIALOG]: false,
            [fields.DIALOG_DATA]: {},
        },
        [fields.ADD_NEW_LITERATURE]: {
            [fields.IS_OPEN_DIALOG]: false,
            [fields.DIALOG_DATA]: [],
        },
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

const setWorkProgramEvaluationTools = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    [fields.WORK_PROGRAM_EVALUATION_TOOLS]: payload
});

const setWorkProgramEvaluationTool = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    [fields.WORK_PROGRAM_EVALUATION_TOOL]: payload
});

const setIntermediateCertification = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    [fields.WORK_PROGRAM_INTERMEDIATE_CERTIFICATION_TOOL]: payload
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

const setRecommendedPrerequisites = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    [fields.RECOMMENDATIONS]: payload.data.results
});

const pageDown = (): workProgramState => initialState;

export const reducer = createReducer(initialState, {
    [actions.setWorkProgramPart.type]: setWorkProgramPart,
    [actions.setWorkProgram.type]: setWorkProgram,

    [actions.setResults.type]: setResults,

    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,

    [actions.setComments.type]: setComments,

    [actions.setWorkProgramEvaluationTools.type]: setWorkProgramEvaluationTools,
    [actions.setWorkProgramEvaluationTool.type]: setWorkProgramEvaluationTool,
    [actions.setIntermediateCertification.type]: setIntermediateCertification,
    [actions.pageDown.type]: pageDown,

    [actions.setRecommendedPrerequisites.type]: setRecommendedPrerequisites,
});
