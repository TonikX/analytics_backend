import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";
import {QualificationType, selectDisciplineState, WorkProgramType} from './types';
import {fields} from "./enum";

const getStateData = (state: rootState): selectDisciplineState => get(state, GENERAL_PATH);

export const getAllKeywords = (state: rootState): Array<string> => get(getStateData(state), fields.ALL_KEYWORDS);
export const getSelectedKeywords = (state: rootState): Array<string> => get(getStateData(state), fields.SELECTED_KEYWORDS);
export const getWorkPrograms = (state: rootState): Array<WorkProgramType> => get(getStateData(state), fields.WORK_PROGRAMS);
export const getSelectedSemester = (state: rootState): number => get(getStateData(state), fields.SELECTED_SEMESTER);
export const getSelectedQualification = (state: rootState): QualificationType => get(getStateData(state), fields.SELECTED_QUALIFICATION);

export const getAllKeywordsExceptSelected = (state: rootState): Array<string> => {
    const allKeywords = getAllKeywords(state);
    const selectedKeywords = getSelectedKeywords(state);

    return allKeywords.filter((keyword: string) => !selectedKeywords.some((item: string) => item === keyword));
};