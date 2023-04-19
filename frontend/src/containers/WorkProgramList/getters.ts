import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {fields, filterFields} from './enum';

import {FiltersType, workProgramListState} from './types';

import {WorkProgramGeneralType} from '../WorkProgram/types';
import {SelectorListType} from "../../components/SearchSelector/types";
import {WorkProgramGeneralFields} from "../WorkProgram/enum";
import {Types} from "../../components/SortingButton/types";

const getStateData = (state: rootState): workProgramListState => get(state, GENERAL_PATH);
export const getWorkProgramList = (state: rootState): Array<WorkProgramGeneralType> => get(getStateData(state), fields.WORK_PROGRAM_LIST, []);
export const getWorkProgramIdForRedirect = (state: rootState): number|null =>
    get(getStateData(state), fields.WORK_PROGRAM_ID_FOR_REDIRECT, null);

export const getWorkProgramsListForSelector = (state: rootState): SelectorListType =>
    getWorkProgramList(state).map((workProgram: WorkProgramGeneralType) => ({
        value: workProgram[WorkProgramGeneralFields.ID],
        label: `${workProgram[WorkProgramGeneralFields.TITLE]} (КОП ИД: ${workProgram[WorkProgramGeneralFields.ID]}, ИСУ ИД: ${workProgram[WorkProgramGeneralFields.DISCIPLINE_CODE]})`,
    }))

export const getWorkProgramDialog = (state: rootState) => get(getStateData(state), fields.WORK_PROGRAM_DIALOG, {});

export const isOpenDialog = (state: rootState) => get(getWorkProgramDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDialogData = (state: rootState) => get(getWorkProgramDialog(state), fields.DIALOG_DATA, false);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, Types.ASC);

export const getFilters = (state: rootState): FiltersType => get(getStateData(state), fields.FILTERING)
// @ts-ignore
export const getShowOnlyMy = (state: rootState): FiltersType => get(getFilters(state), filterFields.ONLY_MY)
// @ts-ignore
export const getShowArchive = (state: rootState): FiltersType => get(getFilters(state), filterFields.ARCHIVE)
// @ts-ignore
export const getStatus = (state: rootState): FiltersType => get(getFilters(state), filterFields.STATUS)
