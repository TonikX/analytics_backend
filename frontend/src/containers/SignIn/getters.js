import get from 'lodash/get';
import {GENERAL_PATH} from "./reducer";

const getStateData = (state) => get(state, GENERAL_PATH, {});

export const getFieldValue = (state, field) => get(getStateData(state), field, '');