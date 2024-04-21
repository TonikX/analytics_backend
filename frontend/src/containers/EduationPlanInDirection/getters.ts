import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {EducationPlanInDirectionFields, fields} from './enum';

import {educationalPlanInDirectionState, EducationalPlanInDirectionType} from './types';
import {SelectorListType} from "../../components/SearchSelector/types";
import {EducationalPlanFields} from "../EducationalPlan/enum";
import {DirectionFields} from "../Direction/enum";
import {specializationObject} from "../WorkProgram/constants";
import {Types} from "../../components/SortingButton/types";

const getStateData = (state: rootState): educationalPlanInDirectionState => get(state, GENERAL_PATH);
export const getEducationalPlanInDirection = (state: rootState): Array<EducationalPlanInDirectionType> => get(getStateData(state), fields.EDUCATION_PLAN_IN_DIRECTION, []);

export const getEducationalPlanInDirectionForSelector = (state: rootState): SelectorListType =>
    getEducationalPlanInDirection(state).map((plan: EducationalPlanInDirectionType) => ({
        value: plan[EducationPlanInDirectionFields.ID],
        label: getEducationalProgramFullNameForSelect(plan),
    }))

export const getEducationalProgramFullNameForSelect = (plan: EducationalPlanInDirectionType) =>
  (plan[EducationPlanInDirectionFields.TITLE] || ' ') + ' ('
  + (plan?.[EducationPlanInDirectionFields.DIRECTION]?.[0]?.[DirectionFields.TITLE] || ' ') + ' '
  + (plan?.[EducationPlanInDirectionFields.DIRECTION]?.[0]?.[DirectionFields.NUMBER] || ' ') + ' '
  + specializationObject[plan?.[EducationPlanInDirectionFields.DIRECTION]?.[0]?.[DirectionFields.QUALIFICATION] || ' '] + ' '
  + (plan?.[EducationPlanInDirectionFields.YEAR] + ')')

export const getEducationalPlanInDirectionForSelector2 = (state: rootState): SelectorListType =>
getEducationalPlanInDirection(state).map((plan: EducationalPlanInDirectionType) => ({
    value: plan[EducationPlanInDirectionFields.TITLE],
    label: plan[EducationPlanInDirectionFields.TITLE],
}))

export const getEducationPlanInDirectionFullName = (plan: EducationalPlanInDirectionType): string =>
    `${get(plan, [EducationPlanInDirectionFields.EDUCATION_PLAN, EducationalPlanFields.PROFILE], '')} (${get(plan, [EducationPlanInDirectionFields.DIRECTION, DirectionFields.NUMBER], '')} "${get(plan, [EducationPlanInDirectionFields.DIRECTION, DirectionFields.FACULTY], '')}")`

export const getEducationalPlanInDirectionDialog = (state: rootState) => get(getStateData(state), fields.EDUCATION_PLAN_IN_DIRECTION_DIALOG, {});

export const isOpenDialog = (state: rootState) => get(getEducationalPlanInDirectionDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDialogData = (state: rootState) => get(getEducationalPlanInDirectionDialog(state), fields.DIALOG_DATA, false);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');
export const getFilters = (state: rootState) => get(getStateData(state), fields.FILTERING, {});

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, Types.ASC);
