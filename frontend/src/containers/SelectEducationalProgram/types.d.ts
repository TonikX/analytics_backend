import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from '@reduxjs/toolkit';

import {fields, professionFields} from './enum'

import {EducationalProgramType} from '../EducationalProgram/types'
import {BACHELOR_QUALIFICATION, MASTER_QUALIFICATION} from "../WorkProgram/constants";

export interface SelectEducationalProgramActions {
  getProfessions: ActionCreatorWithPayload;
  setProfessions: ActionCreatorWithPayload;
  selectProfession: ActionCreatorWithPayload;
  unselectProfession: ActionCreatorWithPayload;
  getEducationalPrograms: ActionCreatorWithPayload;
  setEducationalPrograms: ActionCreatorWithPayload;
  setQualification: ActionCreatorWithPayload;
  selectProgram: ActionCreatorWithPayload;
  unselectProgram: ActionCreatorWithPayload;
  savePrograms: ActionCreatorWithoutPayload;
  resetSelectedPrograms: ActionCreatorWithoutPayload;
}

export type ProfessionType = {
  [professionFields.ID]: number;
  [professionFields.TITLE]: string;
}

export interface selectEducationalProgramState {
  [fields.PROFESSIONS]: Array<ProfessionType>;
  [fields.EDUCATIONAL_PROGRAMS]: Array<EducationalProgramType>;
  [fields.SELECTED_PROFESSIONS]: Array<ProfessionType>;
  [fields.QUALIFICATION]: QualificationType;
  [fields.SELECTED_EDUCATIONAL_PROGRAMS]: Array<number>;
}

export type QualificationType = BACHELOR_QUALIFICATION|MASTER_QUALIFICATION;
