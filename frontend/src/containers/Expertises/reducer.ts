import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {expertisesState} from "./types";

export const GENERAL_PATH = 'expertises';

export const initialState: expertisesState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: "",
    [fields.EXPERTISES_LIST]: [],
    [fields.EXPERTISE]: {},
    [fields.IS_OPEN_ADD_EXPERT_MODAL]: false,
    [fields.SELECTED_STATUS]: '',
    [fields.SELECTED_QUALIFICATION]: '',
    [fields.COMMENTS]: [],
};

const setExpertise = (state: expertisesState, {payload}: any): expertisesState => ({
    ...state,
    [fields.EXPERTISE]: payload,
});

const setData = (state: expertisesState, {payload}: any): expertisesState => ({
    ...state,
    [fields.EXPERTISES_LIST]: payload,
});

const changeSearchQuery = (state: expertisesState, {payload}: any): expertisesState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: expertisesState, {payload}: any): expertisesState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: expertisesState, {payload}: any): expertisesState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const openAddExpertModal = (state: expertisesState): expertisesState => ({
    ...state,
    [fields.IS_OPEN_ADD_EXPERT_MODAL]: true,
});

const closeAddExpertModal = (state: expertisesState): expertisesState => ({
    ...state,
    [fields.IS_OPEN_ADD_EXPERT_MODAL]: false,
});

const changeSelectedStatus = (state: expertisesState, {payload}: any): expertisesState => ({
    ...state,
    [fields.SELECTED_STATUS]: payload,
});
const changeSelectedQualification = (state: expertisesState, {payload}: any): expertisesState => ({
    ...state,
    [fields.SELECTED_QUALIFICATION]: payload,
});

const setComments = (state: expertisesState, {payload}: any): expertisesState => ({
    ...state,
    [fields.COMMENTS]: payload,
});

const changeSorting = (state: expertisesState, {payload}: any): expertisesState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

export const reducer = createReducer(initialState, {
    [actions.setExpertisesList.type]: setData,
    [actions.setComments.type]: setComments,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
    [actions.setExpertise.type]: setExpertise,
    [actions.openAddExpertModal.type]: openAddExpertModal,
    [actions.closeAddExpertModal.type]: closeAddExpertModal,
    [actions.changeSelectedStatus.type]: changeSelectedStatus,
    [actions.changeSelectedQualification.type]: changeSelectedQualification,
});