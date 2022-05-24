import {userProfileState} from "./types";
import createReducer from "../../store/createReducer";
import actions from "./actions";

export const GENERAL_PATH = 'userProfile';

export const initialState: userProfileState = {
    workProgramList: [],
    allCount: 0,
    currentPage: 1,
}

const changeAllCount = (state: userProfileState, {payload}: any): userProfileState => ({
    ...state,
    allCount: payload
});

const setUserWorkProgramsList = (state: userProfileState, {payload}: any): userProfileState => ({
    ...state,
    workProgramList: payload
});

const changeCurrentPage = (state: userProfileState, {payload}: any): userProfileState => ({
    ...state,
    currentPage: payload
});

export const reducer = createReducer(initialState, {
    [actions.setUserWorkProgramsList.type]: setUserWorkProgramsList,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeCurrentPage.type] : changeCurrentPage,
})