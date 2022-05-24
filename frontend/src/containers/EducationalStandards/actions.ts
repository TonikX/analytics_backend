import {createAction} from "@reduxjs/toolkit";
import {
    EducationalStandardAddCompetenceActionType,
    EducationalStandardAddIndicatorActionType,
    EducationalStandardCreateGroupActionType,
    EducationalStandardDeleteCompetenceActionType,
    EducationalStandardDeleteGroupActionType,
    EducationalStandardDeleteIndicatorActionType,
    EducationalStandardSaveGroupTitleActionType
} from "./types";

const getEducationalStandards = createAction('GET_EDUCATIONAL_STANDARDS');
const setEducationalStandards = createAction('SET_EDUCATIONAL_STANDARDS');

const getEducationalStandard = createAction<any>('GET_EDUCATIONAL_STANDARD');
const setEducationalStandard = createAction<any>('SET_EDUCATIONAL_STANDARD');

const createNewEducationalStandard = createAction('CREATE_NEW_EDUCATIONAL_STANDARD');
const changeEducationalStandard = createAction('CHANGE_EDUCATIONAL_STANDARD');
const deleteEducationalStandard = createAction('DELETE_EDUCATIONAL_STANDARD');

const openDialog = createAction('OPEN_EDUCATIONAL_STANDARDS_DIALOG');
const closeDialog = createAction('CLOSE_EDUCATIONAL_STANDARDS_DIALOG');

const changeSearchQuery = createAction('EDUCATIONAL_STANDARDS_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('EDUCATIONAL_STANDARDS_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('EDUCATIONAL_STANDARDS_CHANGE_ALL_COUNT');
const changeSorting = createAction('EDUCATIONAL_STANDARDS_CHANGE_SORTING');

const educationalStandardCreateGroup = createAction<EducationalStandardCreateGroupActionType>('EDUCATIONAL_STANDARD_COMPETENCIES_CREATE_GROUP');
const educationalStandardDeleteGroup = createAction<EducationalStandardDeleteGroupActionType>('EDUCATIONAL_STANDARD_COMPETENCIES_DELETE_GROUP');
const educationalStandardSaveGroupTitle = createAction<EducationalStandardSaveGroupTitleActionType>('EDUCATIONAL_STANDARD_COMPETENCIES_SAVE_GROUP_TITLE');

const educationalStandardSaveCompetence = createAction<EducationalStandardAddCompetenceActionType>('EDUCATIONAL_STANDARD_COMPETENCIES_SAVE_COMPETENCE');
const educationalStandardDeleteCompetence = createAction<EducationalStandardDeleteCompetenceActionType>('EDUCATIONAL_STANDARD_COMPETENCIES_DELETE_COMPETENCE');

const educationalStandardSaveIndicator = createAction<EducationalStandardAddIndicatorActionType>('EDUCATIONAL_STANDARD_COMPETENCIES_SAVE_INDICATOR');
const educationalStandardDeleteIndicator = createAction<EducationalStandardDeleteIndicatorActionType>('EDUCATIONAL_STANDARD_COMPETENCIES_DELETE_INDICATOR');

const educationalStandardAddTask = createAction<any>('EDUCATIONAL_STANDARD_ADD_TASK');
const educationalStandardDeleteTask = createAction<any>('EDUCATIONAL_STANDARD_DELETE_TASK');
const educationalStandardUpdateTask = createAction<any>('EDUCATIONAL_STANDARD_UPDATE_TASK');

const actions = {
    educationalStandardAddTask,
    educationalStandardDeleteTask,
    educationalStandardUpdateTask,

    educationalStandardCreateGroup,
    educationalStandardSaveGroupTitle,
    educationalStandardDeleteGroup,

    educationalStandardSaveCompetence,
    educationalStandardDeleteCompetence,

    educationalStandardSaveIndicator,
    educationalStandardDeleteIndicator,

    getEducationalStandards,
    getEducationalStandard,
    setEducationalStandard,
    setEducationalStandards,
    createNewEducationalStandard,
    changeEducationalStandard,
    deleteEducationalStandard,
    openDialog,
    closeDialog,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;