import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";
import {fields} from './enum';
import {SimpleStatState} from './types';

const getStateData = (state: rootState): SimpleStatState => get(state, GENERAL_PATH);
export const getSimpleStat = (state: rootState) => get(getStateData(state), fields.SIMPLE_STATE, []);
export const getCurrentCH = (state:rootState) => get(getStateData(state), fields.CURRENT_CH, 1);
export const getQualification = (state: rootState) => get(getStateData(state), fields.QUALIFICATION, "bachelor");
export const getQuantityRPD = (state: rootState) => get(getStateData(state), fields.QUANTITY_RPD, []);
export const getYear =(state: rootState) => get(getStateData(state), fields.YEAR, "2021");
export const getYears =(state: rootState) => get(getStateData(state), fields.YEARS_ALL, []);
export const getQuantityOP = (state: rootState) => get(getStateData(state), fields.QUANTITY_OP, []);
export const getQuantityOPAll = (state: rootState) => get(getStateData(state), fields.QUANTITY_OP_ALL, []);
export const getRPDwithoutSU = (state: rootState) => get(getStateData(state), fields.RPD_WITHOUT_SU, []);
export const getRPDinSU = (state: rootState) => get(getStateData(state), fields.RPD_IN_SU, []);
export const getRPDinAP = (state: rootState) => get(getStateData(state), fields.RPD_IN_AP, []);
export const getRPDinSEMESTER = (state: rootState) => get(getStateData(state), fields.RPD_IN_SEMESTER, []);
export const getStatus =(state: rootState) => get(getStateData(state), fields.STATUS, "all");
export const getSemester =(state: rootState) => get(getStateData(state), fields.SEMESTER, "1");
export const getSU =(state: rootState) => get(getStateData(state), fields.SU, []);
export const getAP =(state: rootState) => get(getStateData(state), fields.AP, []);
export const getAPuse =(state: rootState) => get(getStateData(state), fields.APuse, -1);
export const getSUuse =(state: rootState) => get(getStateData(state), fields.SUuse, -1);
