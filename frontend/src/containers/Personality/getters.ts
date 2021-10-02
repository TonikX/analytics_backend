import get from 'lodash/get';

import {rootState} from '../../store/reducers';
import {GENERAL_PATH} from "./reducer";

import { personalityState } from './types';

const getStateData = (state: rootState): personalityState => get(state, GENERAL_PATH);
export const getPersonality = (state: rootState): any => getStateData(state)
