import get from 'lodash/get';

import { rootState } from '../../store/reducers'

import {GENERAL_PATH} from './reducer';
import {selectEducationalProgramState, ProfessionType} from './types'
import {fields} from './enum'

const getStateData = (state: rootState): selectEducationalProgramState => get(state, GENERAL_PATH);
export const getProfessions = (state: rootState) => get(getStateData(state), fields.PROFESSIONS);
export const getSelectedProfessions = (state: rootState) => get(getStateData(state), fields.SELECTED_PROFESSIONS);
export const getEducationalPrograms = (state: rootState) => get(getStateData(state), fields.EDUCATIONAL_PROGRAMS)
export const getQualification = (state: rootState) => get(getStateData(state), fields.QUALIFICATION)
export const getSelectedEducationalPrograms = (state: rootState) => get(getStateData(state), fields.SELECTED_EDUCATIONAL_PROGRAMS)

export const getNoSelectedProfessions = (state: rootState) => {
  const professions = getProfessions(state)
  const selectedProfessions = getSelectedProfessions(state)

  return professions.filter((p: ProfessionType) => 
    !selectedProfessions.some((i: ProfessionType) => i.id === p.id))
}