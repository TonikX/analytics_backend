import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {EducationProgramCharacteristicFields, fields} from './enum';

import {
  educationalProgramState,
  EducationalProgramCharacteristicType,
  EducationalProgramType,
} from './types';
import {SelectorListType} from "../../components/SearchSelector/types";
import {AcademicPlan, CompetenceMatrix} from './Characteristic/CompetenceMatrix/types';
import {EducationalPlanListType} from "../EducationalPlan/types";
import {EducationalPlanFields} from "../EducationalPlan/enum";

import {CharacteristicStatuses, CharacteristicStatusesNames, CharacteristicStatusesColors} from "./enum";
import {Types} from "../../components/SortingButton/types";

const getStateData = (state: rootState): educationalProgramState => get(state, GENERAL_PATH);
export const getEducationalProgramCharacteristic = (state: rootState): EducationalProgramCharacteristicType|{} => get(getStateData(state), fields.EDUCATION_PROGRAM_CHARACTERISTIC, {});
export const getEducationalProgramCharacteristicId = (state: rootState): number => get(getEducationalProgramCharacteristic(state), 'id', 0);
export const getEducationalProgramId = (state: rootState): number => get(getEducationalProgramCharacteristic(state), 'educational_program.0.academic_plan.id', 0);
export const getEducationalProgramCharacteristicCanEdit= (state: rootState): boolean =>
  get(getEducationalProgramCharacteristic(state), 'can_edit', false);

export const getSupraProfessionalCompetencies = (state: rootState): EducationalProgramCharacteristicType|{} =>
    get(getEducationalProgramCharacteristic(state), fields.EDUCATION_PROGRAM_CHARACTERISTIC, {})
;
export const getEducationalProgramList = (state: rootState): Array<EducationalProgramType> => get(getStateData(state), fields.EDUCATION_PROGRAM_LIST, []);

const titlePath = 'work_program_change_in_discipline_block_module.discipline_block_module.descipline_block.0.academic_plan.academic_plan_in_field_of_study.0.title'
const yearPath = 'work_program_change_in_discipline_block_module.discipline_block_module.descipline_block.0.academic_plan.academic_plan_in_field_of_study.0.year'
const titleDirectionPath = 'work_program_change_in_discipline_block_module.discipline_block_module.descipline_block.0.academic_plan.academic_plan_in_field_of_study.0.field_of_study.0.title'
const numberDirectionPath = 'work_program_change_in_discipline_block_module.discipline_block_module.descipline_block.0.academic_plan.academic_plan_in_field_of_study.0.field_of_study.0.number'

export const getDirectionsDependedOnWorkProgram = (state: rootState): Array<any> => get(getStateData(state), fields.DIRECTIONS_DEPENDED_ON_WORK_PROGRAM, []);
export const getUnfilledWorkPrograms = (state: rootState): Array<any> => get(getStateData(state), fields.UNFILLED_WORK_PROGRAMS, []);
export const getUnfilledIndicators = (state: rootState): Array<any> => get(getStateData(state), fields.UNFILLED_INDICATORS, []);
export const getCharacteristicsWorkProgram = (state: rootState): Array<any> => get(getStateData(state), fields.CHARACTERISTICS_WORK_PROGRAM, []);

export const getDirectionsDependedOnWorkProgramForSelector = (state: rootState): SelectorListType =>
    getDirectionsDependedOnWorkProgram(state).map((plan: EducationalPlanListType) => ({
        value: plan[EducationalPlanFields.ID],
        label: `${get(plan, titlePath, '')} ${get(plan, yearPath, '')}: ${get(plan, titleDirectionPath, '')} ${get(plan, numberDirectionPath, '')}`,
    }));

export const getKindsOfActivitiesForSelector = (state: rootState): SelectorListType =>
// @ts-ignore
  getKindsOfActivity(state).map((item: any ) => ({
        value: item.id,
        label: item.name,
    }))
export const getObjectsOfActivitiesForSelector = (state: rootState): SelectorListType =>
// @ts-ignore
  getObjectsOfActivity(state).map((item: any ) => ({
        value: item.id,
        label: item.name,
    }))
export const getTasksTypesForSelector = (state: rootState): SelectorListType =>
// @ts-ignore
  getTasksTypes(state).map((item: any ) => ({
        value: item.id,
        label: item.name,
    }))
export const getCompetenceMatrix = (state: rootState): CompetenceMatrix => get(getStateData(state), fields.COMPETENCE_MATRIX, {});
export const getMatrixAcademicPlans = (state: rootState): AcademicPlan[] => get(getCompetenceMatrix(state), 'wp_matrix', []);

export const getEducationalProgramCharacteristicDialog = (state: rootState) => get(getStateData(state), fields.EDUCATION_PROGRAM_DIALOG, {});
export const getKindsOfActivity = (state: rootState) => get(getStateData(state), fields.KINDS_OF_ACTIVITIES, []);
export const getObjectsOfActivity = (state: rootState) => get(getStateData(state), fields.OBJECTS_OF_ACTIVITIES, []);
export const getTasksTypes = (state: rootState) => get(getStateData(state), fields.TASKS_TYPES, []);

export const isOpenDialog = (state: rootState) => get(getEducationalProgramCharacteristicDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDialogData = (state: rootState) => get(getEducationalProgramCharacteristicDialog(state), fields.DIALOG_DATA, false);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, Types.ASC);

export const getCharacteristicStatusInfo = (state: rootState) => {
  const characteristic = getEducationalProgramCharacteristic(state)
  // @ts-ignore
  const status = characteristic?.[EducationProgramCharacteristicFields.STATUS] as CharacteristicStatuses

  if (!status) return {}

  return ({
    backgroundColor: CharacteristicStatusesColors[status],
    statusText: CharacteristicStatusesNames[status],
  })
};
