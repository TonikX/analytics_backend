import {createAction} from "@reduxjs/toolkit";

import {SelectEducationalProgramActions} from './types'

const key = 'SELECT_EDUCATIONAL_PROGRAM';

const getProfessions = createAction(`${key}_GET_PROFESSIONS`);
const setProfessions = createAction(`${key}_SET_PROFESSIONS`);
const selectProfession = createAction(`${key}_SELECT_PROFESSION`)
const unselectProfession = createAction(`${key}_UNSELECT_PROFESSION`)
const setQualification = createAction(`${key}_SET_QUALIFICATION`)
const getEducationalPrograms = createAction(`${key}_GET_EDUCATIONAL_PROGRAMS`)
const setEducationalPrograms = createAction(`${key}_SET_EDUCATIONAL_PROGRAMS`)
const selectProgram = createAction(`${key}_SELECT_PROGRAM`)
const unselectProgram = createAction(`${key}_UNSELECT_PROGRAM`)
const savePrograms = createAction(`${key}_SAVE_PROGRAMS`)
const resetSelectedPrograms = createAction(`${key}_RESET_SELECTED_PROGRAMS`)

const actions: SelectEducationalProgramActions = {
  getProfessions,
  setProfessions,
  selectProfession,
  unselectProfession,
  setQualification,
  getEducationalPrograms,
  setEducationalPrograms,
  selectProgram,
  unselectProgram,
  savePrograms,
  resetSelectedPrograms,
}

export default actions;