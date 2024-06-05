import get from 'lodash/get';
import {rootState} from '../../store/reducers';
import {GENERAL_PATH} from "./reducer";
import {fields} from './enum';
import {mergeWorkProgramsState} from './types';
import {WorkProgramGeneralType} from '../WorkProgram/types';

const getStateData = (state: rootState): mergeWorkProgramsState => get(state, GENERAL_PATH);
export const getWorkProgramList = (state: rootState): Array<WorkProgramGeneralType> => get(getStateData(state), fields.WORK_PROGRAM_LIST, []);

export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');
