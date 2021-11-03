import {dodProfileState} from "./types";
import createReducer from "../../store/createReducer";
import actions from "./actions";

export const GENERAL_PATH = 'DodProfile';

export const initialState: dodProfileState = {
    workProgramList: [],
    allCount: 0,
    currentPage: 1,
    tableMode: 1,
    userName: {},
    userGroups: []
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

const setUserName = (state: dodProfileState, {payload}: any): dodProfileState => ({
    ...state,
    userName: payload
});

const changeTableMode = (state: dodProfileState, {payload}: any): dodProfileState => ({
    ...state,
    tableMode: payload
});

const setUserGroups = (state: dodProfileState, {payload}: any): dodProfileState => ({
    ...state,
    userGroups: payload
});

export const reducer = createReducer(initialState, {
    [actions.setDodWorkProgramsList.type]: setDodWorkProgramsList,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeCurrentPage.type] : changeCurrentPage,
    [actions.changeTableMode.type] : changeTableMode,
    [actions.setUserName.type] : setUserName,
    [actions.setUserGroups.type] : setUserGroups,


})