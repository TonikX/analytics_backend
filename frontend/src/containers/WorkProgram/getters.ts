import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {fields} from './enum';

import {workProgramState} from './types';

const getStateData = (state: rootState): workProgramState => get(state, GENERAL_PATH);
export const getWorkProgram = (state: rootState) => get(getStateData(state), fields.WORK_PROGRAM, {});
export const getWorkProgramId = (state: rootState) => get(getStateData(state), fields.WORK_PROGRAM_ID, '');
export const getWorkProgramField = (state: rootState, field: string) => get(getWorkProgram(state), field);
