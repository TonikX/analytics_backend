import get from 'lodash/get';

import {rootState} from '../../store/reducers';
import {GENERAL_PATH} from "./reducer";

import { fields } from './enum'
import {courseState, outcomeType, fieldOfStudyType, reqType, wpType } from './types';

const getStateData = (state: rootState): courseState => get(state, GENERAL_PATH);
export const getCourse = (state: rootState): any => getStateData(state);
export const getOutcomes = (state: rootState): Array<outcomeType> => get(getStateData(state), fields.OUTCOMES, [])
export const getFieldsOfStudy= (state: rootState): Array<fieldOfStudyType> => get(getStateData(state), fields.FIELDS_OF_STUDY, [])
export const getRequirements = (state: rootState): Array<reqType> => get(getStateData(state), fields.REQUIREMENTS, [])
export const getWorkPrograms = (state: rootState): Array<wpType> => get(getStateData(state), fields.WORK_PROGRAMS, [])