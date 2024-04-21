import createReducer from "../../store/createReducer";
import {fields, qualificationEnum} from './enum';
import actions from "./actions";

import {selectDisciplineState} from "./types";

export const GENERAL_PATH = 'select-discipline';

export const initialState: selectDisciplineState = {
    [fields.ALL_KEYWORDS]: [],
    [fields.SELECTED_KEYWORDS]: [],
    [fields.SELECTED_SEMESTER]: 3,
    [fields.SELECTED_QUALIFICATION]: qualificationEnum.BACHELOR,
    [fields.WORK_PROGRAMS]: [],
};

const selectDisciplineSetKeywords = (state: selectDisciplineState, {payload}: any): selectDisciplineState => ({
    ...state,
    [fields.ALL_KEYWORDS]: payload,
});

const setCorrectWorkPrograms = (state: selectDisciplineState, {payload}: any): selectDisciplineState => ({
    ...state,
    [fields.WORK_PROGRAMS]: payload,
});

const selectSemester = (state: selectDisciplineState, {payload}: any): selectDisciplineState => ({
    ...state,
    [fields.SELECTED_SEMESTER]: payload,
    [fields.ALL_KEYWORDS]: [],
    [fields.SELECTED_KEYWORDS]: [],
});

const selectQualification = (state: selectDisciplineState, {payload}: any): selectDisciplineState => ({
    ...state,
    [fields.SELECTED_QUALIFICATION]: payload,
    [fields.ALL_KEYWORDS]: [],
    [fields.SELECTED_KEYWORDS]: [],
});

const selectDisciplineSelectKeyword = (state: selectDisciplineState, {payload}: any): selectDisciplineState => ({
    ...state,
    [fields.SELECTED_KEYWORDS]: [
        ...state[fields.SELECTED_KEYWORDS],
        payload
    ],
});

const selectDisciplineUnselectKeyword = (state: selectDisciplineState, {payload}: any): selectDisciplineState => ({
    ...state,
    [fields.SELECTED_KEYWORDS]: state[fields.SELECTED_KEYWORDS].filter(item => item !== payload)
});

export const reducer = createReducer(initialState, {
    [actions.selectDisciplineSetKeywords.type]: selectDisciplineSetKeywords,
    [actions.setCorrectWorkPrograms.type]: setCorrectWorkPrograms,
    [actions.selectDisciplineSelectKeyword.type]: selectDisciplineSelectKeyword,
    [actions.selectDisciplineUnselectKeyword.type]: selectDisciplineUnselectKeyword,
    [actions.selectSemester.type]: selectSemester,
    [actions.selectQualification.type]: selectQualification,
});
