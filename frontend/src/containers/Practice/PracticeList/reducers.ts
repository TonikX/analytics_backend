import {practiceListState} from "./types";
import createReducer from "../../../store/createReducer";
import actions from "./actions";

export const GENERAL_PATH = 'practiceList';

export const initialState: practiceListState = {
    results: [],
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

export const reducer = createReducer(initialState, {
    [actions.setPracticeList.type]: setPracticeList,
    [actions.openModal.type]: openModal,
    [actions.closeModal.type]: closeModal,
});