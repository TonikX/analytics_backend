import createReducer from "../../store/createReducer";
import { fields } from "./enum";
import actions from "./actions";
import { selectEducationalProgramState, ProfessionType } from './types'

export const GENERAL_PATH = 'select-educational-program';

const initialState: selectEducationalProgramState = {
  [fields.PROFESSIONS]: [],
  [fields.EDUCATIONAL_PROGRAMS]: [],
  [fields.SELECTED_PROFESSIONS]: [],
}

const setProfessions = (state: selectEducationalProgramState, {payload}: any): selectEducationalProgramState => ({
  ...state,
  [fields.PROFESSIONS]: payload
})

const selectProfession = (state: selectEducationalProgramState, {payload}: any): selectEducationalProgramState => ({
  ...state,
  [fields.SELECTED_PROFESSIONS]: [...state[fields.SELECTED_PROFESSIONS], payload]
})

const unselectProfession = (state: selectEducationalProgramState, {payload}: any): selectEducationalProgramState => ({
  ...state,
  [fields.SELECTED_PROFESSIONS]: [...state[fields.SELECTED_PROFESSIONS]
    .filter((i: ProfessionType) => i.id !== payload.id)]
})

const setEducationalPrograms = (state: selectEducationalProgramState, {payload}: any): selectEducationalProgramState => ({
  ...state,
  [fields.EDUCATIONAL_PROGRAMS]: payload
})

export const reducer = createReducer(initialState, {
  [actions.setProfessions.type]: setProfessions,
  [actions.selectProfession]: selectProfession,
  [actions.unselectProfession]: unselectProfession,
  [actions.setEducationalPrograms]: setEducationalPrograms,
})