import createReducer from "../../store/createReducer";
import { fields } from "./enum";
import actions from "./actions";
import { selectEducationalProgramState, ProfessionType } from './types'
import {BACHELOR_QUALIFICATION} from "../WorkProgram/constants";

export const GENERAL_PATH = 'select-educational-program';

const initialState: selectEducationalProgramState = {
  [fields.PROFESSIONS]: [],
  [fields.EDUCATIONAL_PROGRAMS]: [],
  [fields.SELECTED_PROFESSIONS]: [],
  [fields.SELECTED_EDUCATIONAL_PROGRAMS]: [],
  [fields.QUALIFICATION]: BACHELOR_QUALIFICATION,
}

const setProfessions = (state: selectEducationalProgramState, {payload}: any): selectEducationalProgramState => ({
  ...state,
  [fields.PROFESSIONS]: payload
})

const selectProfession = (state: selectEducationalProgramState, {payload}: any): selectEducationalProgramState => ({
  ...state,
  [fields.SELECTED_PROFESSIONS]: [...state[fields.SELECTED_PROFESSIONS], payload]
})
const selectProgram = (state: selectEducationalProgramState, {payload}: any): selectEducationalProgramState => ({
  ...state,
  [fields.SELECTED_EDUCATIONAL_PROGRAMS]: [...state[fields.SELECTED_EDUCATIONAL_PROGRAMS], payload]
})

const unselectProfession = (state: selectEducationalProgramState, {payload}: any): selectEducationalProgramState => ({
  ...state,
  [fields.SELECTED_PROFESSIONS]: [...state[fields.SELECTED_PROFESSIONS]
    .filter((i: ProfessionType) => i.id !== payload.id)]
})

const unselectProgram = (state: selectEducationalProgramState, {payload}: any): selectEducationalProgramState => ({
  ...state,
  [fields.SELECTED_EDUCATIONAL_PROGRAMS]: [...state[fields.SELECTED_EDUCATIONAL_PROGRAMS]
    .filter((id: number) => id !== payload)]
})

const setEducationalPrograms = (state: selectEducationalProgramState, {payload}: any): selectEducationalProgramState => ({
  ...state,
  [fields.EDUCATIONAL_PROGRAMS]: payload
})

const setQualification = (state: selectEducationalProgramState, {payload}: any): selectEducationalProgramState => ({
  ...state,
  [fields.QUALIFICATION]: payload
})

const resetSelectedPrograms = (state: selectEducationalProgramState): selectEducationalProgramState => ({
  ...state,
  [fields.SELECTED_EDUCATIONAL_PROGRAMS]: []
})

export const reducer = createReducer(initialState, {
  [actions.setProfessions.type]: setProfessions,
  [actions.selectProfession]: selectProfession,
  [actions.unselectProfession]: unselectProfession,
  [actions.setEducationalPrograms]: setEducationalPrograms,
  [actions.setQualification]: setQualification,
  [actions.selectProgram]: selectProgram,
  [actions.unselectProgram]: unselectProgram,
// @ts-ignore
  [actions.resetSelectedPrograms]: resetSelectedPrograms,
})
