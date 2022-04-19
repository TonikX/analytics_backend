import {practiceListState} from "./types";
import createReducer from "../../store/createReducer";
import actions from "../PracticeList/actions";

export const GENERAL_PATH = 'practiceList';

export const initialState: practiceListState = {
    results: [],
}

const setPracticeList = (state: practiceListState, {payload}: any): practiceListState => ({
    ...state,
    results: payload,
});

export const reducer = createReducer(initialState, {
    [actions.setPracticeList.type]: setPracticeList,
});