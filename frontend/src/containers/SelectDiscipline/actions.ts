import {createAction} from "@reduxjs/toolkit";

import {SelectDisciplineActions} from './types';

const key = 'SELECT_DISCIPLINE';

const selectDisciplineGetKeywords = createAction(`${key}_GET_KEYWORDS`);
const selectDisciplineSetKeywords = createAction(`${key}_SET_KEYWORDS`);

const selectDisciplineGetWorkPrograms = createAction(`${key}_GET_WORK_PROGRAMS`);
const getCorrectWorkPrograms = createAction(`${key}_GET_CORRECT_WORK_PROGRAMS`);
const setCorrectWorkPrograms = createAction(`${key}_SET_CORRECT_WORK_PROGRAMS`);

const selectDisciplineSelectKeyword = createAction(`${key}_SELECT_KEYWORD`);
const selectDisciplineUnselectKeyword = createAction(`${key}_UNSELECT_KEYWORD`);

const selectSemester = createAction(`${key}_SELECT_SEMESTER`);
const selectQualification = createAction(`${key}_SELECT_QUALIFICATION`);

const actions: SelectDisciplineActions = {
    selectDisciplineGetKeywords,
    selectDisciplineSetKeywords,

    selectDisciplineGetWorkPrograms,
    getCorrectWorkPrograms,
    setCorrectWorkPrograms,

    selectDisciplineSelectKeyword,
    selectDisciplineUnselectKeyword,

    selectSemester,
    selectQualification,
}

export default actions;