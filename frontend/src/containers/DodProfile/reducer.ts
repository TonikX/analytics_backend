import {dodProfileState} from "./types";
import createReducer from "../../store/createReducer";
import actions from "./actions";

export const GENERAL_PATH = 'DodProfile';

export const initialState: dodProfileState = {
    workProgramList: [],
    allCount: 0,
    currentPage: 1,
    tableMode: 1,
}

const setDodWorkProgramsList = (state: dodProfileState, {payload}: any): dodProfileState => ({
    ...state,
    workProgramList: payload
});

const changeAllCount = (state: dodProfileState, {payload}: any): dodProfileState => ({
    ...state,
    allCount: payload
});

const changeCurrentPage = (state: dodProfileState, {payload}: any): dodProfileState => ({
    ...state,
    currentPage: payload
});

const changeTableMode = (state: dodProfileState, {payload}: any): dodProfileState => ({
    ...state,
    tableMode: payload
});

export const reducer = createReducer(initialState, {
    [actions.setDodWorkProgramsList.type]: setDodWorkProgramsList,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeCurrentPage.type] : changeCurrentPage,
    [actions.changeTableMode.type] : changeTableMode,


})