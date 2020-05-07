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
};

const setWorkProgram = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    [fields.WORK_PROGRAM]: {
        ...state[fields.WORK_PROGRAM],
        ...payload
    }
});

const setWorkProgramId = (state: workProgramState, {payload}: any): workProgramState => ({
    ...state,
    [fields.WORK_PROGRAM_ID]: payload
});

export const reducer = createReducer(initialState, {
    [actions.setWorkProgram.type]: setWorkProgram,
    [actions.setWorkProgramId.type]: setWorkProgramId,
});