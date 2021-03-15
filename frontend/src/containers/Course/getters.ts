import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

// import {CourseFields, fields, InstitutionFields, PlatformFields} from './enum';

import {courseState  } from './types';
//import {SelectorListType} from "../../components/SearchSelector/types";

const getStateData = (state: rootState): courseState => get(state, GENERAL_PATH);
export const getCourse = (state: rootState): any => getStateData(state);

// export const getPlatforms = (state: rootState) => get(getStateData(state), fields.PLATFORMS, [])
// export const getIntitutions = (state: rootState) => get(getStateData(state), fields.INSTITUTIONS, [])