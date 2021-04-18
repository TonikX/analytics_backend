import get from 'lodash/get';

import {rootState} from '../../store/reducers';
import {GENERAL_PATH} from "./reducer";

import { fields } from './enum'
import {courseState, outcomeType, fieldOfStudyType, wpType } from './types';

const getStateData = (state: rootState): courseState => get(state, GENERAL_PATH);
export const getCourse = (state: rootState): any => getStateData(state);
export const getOutcomes = (state: rootState): string | null => get(getStateData(state), fields.OUTCOMES, null)
export const getOutcomesList = (state: rootState): Array<outcomeType> => get(getStateData(state), fields.OUTCOMES_LIST, [])
export const getFieldsOfStudy= (state: rootState): Array<fieldOfStudyType> => get(getStateData(state), fields.FIELDS_OF_STUDY, [])
export const getRequirements = (state: rootState): string | null => get(getStateData(state), fields.REQUIREMENTS, null)
export const getWorkPrograms = (state: rootState): Array<wpType> => get(getStateData(state), fields.WORK_PROGRAMS, [])