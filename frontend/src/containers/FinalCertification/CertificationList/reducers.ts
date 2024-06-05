import {certificationListState} from "./types";
import createReducer from "../../../store/createReducer";
import actions from "./actions";

export const GENERAL_PATH = 'certificationList';

export const initialState: certificationListState = {
    results: [],
    searchText: '',
    sorting: {
        field: '',
        mode: '',
    },
    certificationCount: 0,
    currentPage: 1,
    modal: {
        isModalOpen: false,
    }
}

const setCertificationList = (state: certificationListState, {payload}: any): certificationListState => ({
    ...state,
    results: payload,
});

const setSearchText = (state: certificationListState, {payload}: any): certificationListState => ({
    ...state,
    searchText: payload,
});

const setSortingField = (state: certificationListState, {payload}: any): certificationListState => ({
    ...state,
    sorting: {
        ...state.sorting,
        field: payload,
    }
});

const setCurrentPage = (state: certificationListState, {payload}: any): certificationListState => ({
    ...state,
    currentPage: payload,
});

const setCertificationCount = (state: certificationListState, {payload}: any): certificationListState => ({
    ...state,
    certificationCount: payload,
});

const openModal = (state: certificationListState): certificationListState => ({
    ...state,
    modal: {
        ...state.modal,
        isModalOpen: true,
    }
});

const closeModal = (state: certificationListState): certificationListState => ({
    ...state,
    modal: {
        ...state.modal,
        isModalOpen: false,
    }
});

export const reducer = createReducer(initialState, {
    [actions.setCertificationList.type]: setCertificationList,
    [actions.setSearchText.type]: setSearchText,
    [actions.setSortingField.type]: setSortingField,
    [actions.setCurrentPage.type]: setCurrentPage,
    [actions.setCertificationCount.type]: setCertificationCount,
    [actions.openModal.type]: openModal,
    [actions.closeModal.type]: closeModal,
});
