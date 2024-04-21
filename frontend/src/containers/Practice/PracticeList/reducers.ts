import {practiceListState} from "./types";
import createReducer from "../../../store/createReducer";
import actions from "./actions";

export const GENERAL_PATH = 'practiceList';

export const initialState: practiceListState = {
    results: [],
    searchText: '',
    sorting: {
        field: '',
        mode: '',
    },
    practiceCount: 0,
    currentPage: 1,
    modal: {
        isModalOpen: false,
    }
}

const setPracticeList = (state: practiceListState, {payload}: any): practiceListState => ({
    ...state,
    results: payload,
});

const openModal = (state: practiceListState): practiceListState => ({
    ...state,
    modal: {
        ...state.modal,
        isModalOpen: true,
    }
});

const closeModal = (state: practiceListState): practiceListState => ({
    ...state,
    modal: {
        ...state.modal,
        isModalOpen: false,
    }
});

const setSearchText = (state: practiceListState, {payload}: any): practiceListState => ({
    ...state,
    searchText: payload,
});

const setSortingField = (state: practiceListState, {payload}: any): practiceListState => ({
    ...state,
    sorting: {
        ...state.sorting,
        field: payload,
    }
});

const setCurrentPage = (state: practiceListState, {payload}: any): practiceListState => ({
    ...state,
    currentPage: payload,
});

const setPracticeCount = (state: practiceListState, {payload}: any): practiceListState => ({
    ...state,
    practiceCount: payload,
});

export const reducer = createReducer(initialState, {
    [actions.setPracticeList.type]: setPracticeList,
    [actions.openModal.type]: openModal,
    [actions.closeModal.type]: closeModal,
    [actions.setSearchText.type]: setSearchText,
    [actions.setSortingField.type]: setSortingField,
    [actions.setCurrentPage.type]: setCurrentPage,
    [actions.setPracticeCount.type]: setPracticeCount,
});
