import {ActionCreatorWithPayload} from '@reduxjs/toolkit';

import {fields, professionFields} from './enum'

import {EducationalProgramType} from '../EducationalProgram/types'

export interface SelectEducationalProgramActions {
  getProfessions: ActionCreatorWithPayload;
  setProfessions: ActionCreatorWithPayload;
  selectProfession: ActionCreatorWithPayload;
  unselectProfession: ActionCreatorWithPayload;
  getEducationalPrograms: ActionCreatorWithPayload;
  setEducationalPrograms: ActionCreatorWithPayload;
}

export type ProfessionType = {
  [professionFields.ID]: number;
  [professionFields.TITLE]: string;
}

export interface selectEducationalProgramState {
  [fields.PROFESSIONS]: Array<ProfessionType>;
  [fields.EDUCATIONAL_PROGRAMS]: Array<EducationalProgramType>;
  [fields.SELECTED_PROFESSIONS]: Array<ProfessionType>;
}
