import createReducer from "../../store/createReducer";
import { fields } from "./enum";
import actions from "./actions";

import { personalityState } from "./types";

export const GENERAL_PATH = 'personality';

export const initialState: personalityState = {
    [fields.ID]: undefined,
    [fields.EMAIL]: '',
    [fields.USERNAME]: '',
    [fields.FIRST_NAME]: '',
    [fields.LAST_NAME]: '',
    [fields.ISU_NUMBER]: 0,
    [fields.GROUPS]: []
}

const setPersonality = (state: personalityState, {payload}: any): personalityState => ({
    ...state,
    ...payload,
  });
  
  export const reducer = createReducer(initialState, {
    [actions.setPersonality.type]: setPersonality,
  });