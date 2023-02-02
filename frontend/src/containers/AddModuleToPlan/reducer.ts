import {addModuleToPlanState} from "./types";
import createReducer from "../../store/createReducer";
import actions from "./actions";
import {Types} from "../../components/SortingButton/types";

export const GENERAL_PATH = 'ADD_MODULE_TO_PLAN';

export const initialState: addModuleToPlanState = {
    trainingModulesList: [],
    currentModulesPage: 1,
    modulesSearchQuery: '',
    sortingMode: Types.ASC,
    modulesAllCount: 0,

    plansAllCount: 0,
    educationalPlansList: [],
    plansSearchQuery: '',
    currentPlansPage: 1,

    selectedBlock: '',
    selectedModules: [],
    selectedPlans: [],
    selectAll: false
};

const setTrainingModulesList = (state: addModuleToPlanState, {payload}: any): addModuleToPlanState => ({
    ...state,
    trainingModulesList: payload
});

const changeModulesCurrentPage = (state: addModuleToPlanState, {payload}: any): addModuleToPlanState => ({
    ...state,
    currentModulesPage: payload
});

const changePlansCurrentPage = (state: addModuleToPlanState, {payload}: any): addModuleToPlanState => ({
    ...state,
    currentPlansPage: payload
});

const setModulesSortingMode = (state: addModuleToPlanState, {payload}: any): addModuleToPlanState => ({
    ...state,
    sortingMode: payload
});

const changeModulesAllCount = (state: addModuleToPlanState, {payload}: any): addModuleToPlanState => ({
    ...state,
    modulesAllCount: payload
});

const changePlansAllCount = (state: addModuleToPlanState, {payload}: any): addModuleToPlanState => ({
    ...state,
    plansAllCount: payload
});

const setModulesSearchQuery = (state: addModuleToPlanState, {payload}: any): addModuleToPlanState => ({
    ...state,
    modulesSearchQuery: payload
});

const setPlansSearchQuery = (state: addModuleToPlanState, {payload}: any): addModuleToPlanState => ({
    ...state,
    plansSearchQuery: payload
});

const setEducationalPlan = (state: addModuleToPlanState, {payload}: any): addModuleToPlanState => ({
    ...state,
    educationalPlansList: payload
});

const setSelectedPlans = (state: addModuleToPlanState, {payload}: any): addModuleToPlanState => ({
    ...state,
    selectedPlans: payload
});

const setSelectedModules = (state: addModuleToPlanState, {payload}: any): addModuleToPlanState => ({
    ...state,
    selectedModules: payload
});

const setSelectAll = (state: addModuleToPlanState, {payload}: any): addModuleToPlanState => ({
    ...state,
    selectAll: payload
});

const setSelectedBlock = (state: addModuleToPlanState, {payload}: any): addModuleToPlanState => ({
    ...state,
    selectedBlock: payload
});

export const reducer = createReducer(initialState, {
    [actions.setTrainingModulesList.type]: setTrainingModulesList,
    [actions.changeModulesCurrentPage.type]: changeModulesCurrentPage,
    [actions.setModulesSortingMode.type]: setModulesSortingMode,
    [actions.changeModulesAllCount.type]: changeModulesAllCount,
    [actions.setModulesSearchQuery.type]: setModulesSearchQuery,

    [actions.setEducationalPlan.type]: setEducationalPlan,
    [actions.changePlansAllCount.type]: changePlansAllCount,
    [actions.changePlansCurrentPage.type]: changePlansCurrentPage,
    [actions.setPlansSearchQuery.type]: setPlansSearchQuery,
    [actions.setSelectAll.type]: setSelectAll,

    [actions.setSelectedBlock.type]: setSelectedBlock,
    [actions.setSelectedModules.type]: setSelectedModules,
    [actions.setSelectedPlans.type]: setSelectedPlans,
});
