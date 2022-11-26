import get from 'lodash/get';

import {rootState} from '../../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {fields, TrainingModuleFields} from './enum';

import {trainingModulesState, TrainingModuleType} from './types';
import {SelectorListType} from "../../../components/SearchSelector/types";

const getStateData = (state: rootState): trainingModulesState => get(state, GENERAL_PATH);
export const getTrainingModulesList = (state: rootState): Array<TrainingModuleType> => get(getStateData(state), fields.TRAINING_MODULES_LIST, []);
export const getTrainingModulesListForSelector = (state: rootState): SelectorListType => getTrainingModulesList(state).map(item => ({
    value: item[TrainingModuleFields.ID],
    label: item[TrainingModuleFields.NAME],
}));

export const getTrainingModule = (state: rootState): TrainingModuleType|{} => get(getStateData(state), fields.DETAIL_TRAINING_MODULE, {});
export const getEvaluationListModule = (state: rootState): TrainingModuleType|{} =>
  get(getTrainingModule(state), TrainingModuleFields.CERTIFICATION_EVALUATION_LIST, []);
export const getTrainingModuleId = (state: rootState): number => get(getTrainingModule(state), TrainingModuleFields.ID, 0);
export const getModuleRating = (state: rootState): boolean => get(getTrainingModule(state), 'rating', false);
export const getModuleRatingId = (state: rootState): number => get(getTrainingModule(state), 'id_rating', 0);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, '');

export const getFilterField = (state: rootState, field: string) =>
  get(getStateData(state), [fields.FILTERS, field], '');

export const getDialogData = (state: rootState, dialog: string) =>
  get(getStateData(state), [dialog, fields.DIALOG_DATA], {});
export const isOpenDialog = (state: rootState, dialog: string) =>
  get(getStateData(state), [dialog, fields.IS_OPEN_DIALOG], false);

export const getShowOnlyMy = (state: rootState) => get(getStateData(state), fields.SHOW_ONLY_MY, false);
export const getTrainingModuleIdForRedirect = (state: rootState) => get(getStateData(state), fields.TRAINIG_MODULE_ID_FOR_REDIRECT, false);
