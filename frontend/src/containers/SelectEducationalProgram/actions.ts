import {createAction} from "@reduxjs/toolkit";

import {SelectEducationalProgramActions} from './types'

const key = 'SELECT_EDUCATIONAL_PROGRAM';

const getProfessions = createAction(`${key}_GET_PROFESSIONS`);
const setProfessions = createAction(`${key}_SET_PROFESSIONS`);
const selectProfession = createAction(`${key}_SELECT_PROFESSION`)
const unselectProfession = createAction(`${key}_UNSELECT_PROFESSION`)

const actions: SelectEducationalProgramActions = {
  getProfessions,
  setProfessions,
  selectProfession,
  unselectProfession
}

export default actions;