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
export const getTrainingModuleId = (state: rootState): number => get(getTrainingModule(state), TrainingModuleFields.ID, 0);
export const getModuleRating = (state: rootState): boolean => get(getTrainingModule(state), 'rating', false);
export const getModuleRatingId = (state: rootState): number => get(getTrainingModule(state), 'id_rating', 0);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, '');

export const getDialogData = (state: rootState) => get(getStateData(state), [fields.TRAINING_MODULE_DIALOG, fields.TRAINING_MODULE_DIALOG_DATA], {});
export const isOpenDialog = (state: rootState) => get(getStateData(state), [fields.TRAINING_MODULE_DIALOG, fields.IS_OPEN_TRAINING_MODULE_DIALOG], false);

export const getShowOnlyMy = (state: rootState) => get(getStateData(state), fields.SHOW_ONLY_MY, false);
