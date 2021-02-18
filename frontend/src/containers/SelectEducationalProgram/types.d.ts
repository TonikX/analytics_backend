import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';

import { fields, professionFields } from './enum'

export interface SelectEducationalProgramActions {
  getProfessions: ActionCreatorWithPayload;
  setProfessions: ActionCreatorWithPayload;
  selectProfession: ActionCreatorWithPayload;
  unselectProfession: ActionCreatorWithPayload;
}

export type ProfessionType = {
  [professionFields.ID]: number;
  [professionFields.TITLE]: string;
}


export interface selectEducationalProgramState {
  [fields.PROFESSIONS]: Array<ProfessionType>;
  [fields.EDU_PROGRAMS]: Array;
  [fields.SELECTED_PROFESSIONS]: Array;
}
