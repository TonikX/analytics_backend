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

    competenceFilters: {
        year: 2023,
        imp: null,
        ap: null
    },

    [fields.WORK_PROGRAM_INTERMEDIATE_CERTIFICATION_TOOLS]: [],
    [fields.WORK_PROGRAM_INTERMEDIATE_CERTIFICATION_TOOL]: {},
    [fields.AP_WITH_COMPETENCES_AND_INDICATORS_TO_WP]: [],
    [fields.ALL_COMPETENCES_AND_INDICATORS_FOR_WP]: [],
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

const setApWithCompetencesAndIndicatorsToWp = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    [fields.AP_WITH_COMPETENCES_AND_INDICATORS_TO_WP]: payload
});

const setAllCompetencesAndIndicatorsForWp = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    [fields.ALL_COMPETENCES_AND_INDICATORS_FOR_WP]: payload
});

const setWorkProgramEvaluationTool = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    [fields.WORK_PROGRAM_EVALUATION_TOOL]: payload
});

const setIntermediateCertification = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    [fields.WORK_PROGRAM_INTERMEDIATE_CERTIFICATION_TOOL]: payload
});

const updateCompetenceFilterYear = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    competenceFilters: {
        ...state.competenceFilters,
        year: payload,
    }
});

const updateCompetenceFilterIMP = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    competenceFilters: {
        ...state.competenceFilters,
        imp: payload,
    }
});

const updateCompetenceFilterAP = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    competenceFilters: {
        ...state.competenceFilters,
        ap: payload,
    }
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

    [actions.setResults.type]: setResults,

    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,

    [actions.setComments.type]: setComments,

    [actions.setApWithCompetencesAndIndicatorsToWp.type]: setApWithCompetencesAndIndicatorsToWp,
    [actions.setAllCompetencesAndIndicatorsForWp.type]: setAllCompetencesAndIndicatorsForWp,

    [actions.setWorkProgramEvaluationTools.type]: setWorkProgramEvaluationTools,
    [actions.setWorkProgramEvaluationTool.type]: setWorkProgramEvaluationTool,
    [actions.setIntermediateCertification.type]: setIntermediateCertification,

    [actions.updateCompetenceFilterYear.type]: updateCompetenceFilterYear,
    [actions.updateCompetenceFilterIMP.type]: updateCompetenceFilterIMP,
    [actions.updateCompetenceFilterAP.type]: updateCompetenceFilterAP,

    [actions.pageDown.type]: pageDown,
});
