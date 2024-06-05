import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {fields, TrainingEntitiesFields} from './enum';

import {trainingEntitiesState, TrainingEntitityType} from './types';
import {Types} from "../../components/SortingButton/types";

const getStateData = (state: rootState): trainingEntitiesState => get(state, GENERAL_PATH);
export const getTrainingEntitiesList = (state: rootState): Array<TrainingEntitityType> => get(getStateData(state), fields.TRAINING_ENTITIES_LIST, []);

export const getTrainingEntitiesDialog = (state: rootState) => get(getStateData(state), fields.TRAINING_ENTITIES_DIALOG, {});

export const getTrainingEntitiesForSelect = (state: rootState) => {
    const allTrainingEntities = getTrainingEntitiesList(state);

    return allTrainingEntities.map((item: any) => ({
        label: item[TrainingEntitiesFields.TITLE],
        value: item[TrainingEntitiesFields.ID]
    }))
}

export const isOpenDialog = (state: rootState) => get(getTrainingEntitiesDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDialogData = (state: rootState) => get(getTrainingEntitiesDialog(state), fields.DIALOG_DATA, false);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');
export const getSubjectId = (state: rootState) => get(getStateData(state), fields.SUBJECT_ID, null);

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, Types.ASC);
