import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {educationalPlanState} from "./types";

export const GENERAL_PATH = 'educationalPlan';

export const initialState: educationalPlanState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: '',
    [fields.EDUCATIONAL_PLAN_LIST]: [],
    [fields.DETAIL_PLAN]: {},
    [fields.EDUCATIONAL_PLAN_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    },
    [fields.DOWNLOAD_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    },
    [fields.EDUCATIONAL_PLAN_DETAIL_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    },
    [fields.EDUCATIONAL_PLAN_CREATE_MODULE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    },
    [fields.EDUCATIONAL_PLAN_ADD_MODULE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    },
    [fields.EDUCATIONAL_PLAN_CREATE_MODULE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    },
    [fields.DIRECTIONS_DEPENDED_ON_WORK_PROGRAM]: [],
    [fields.IS_TRAJECTORY_ROUTE]: false,
    [fields.TRAJECTORY_USER_DATA]: {},
    [fields.TRAJECTORY_DIRECTION]: {},
    [fields.NEW_PLAN_ID_FOR_REDIRECT]: null,
};

const setIsTrajectoryRoute = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.IS_TRAJECTORY_ROUTE]: payload,
});

const planTrajectorySetUserData = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.TRAJECTORY_USER_DATA]: payload,
});

const planTrajectorySetDirection = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.TRAJECTORY_DIRECTION]: payload,
});

const setNewPlanIdForRedirect = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.NEW_PLAN_ID_FOR_REDIRECT]: payload,
});

const setEducationalPlans = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.EDUCATIONAL_PLAN_LIST]: payload,
});

const setEducationalPlanDetail = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.DETAIL_PLAN]: payload,
});

const setDirectionsDependedOnWorkProgram = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.DIRECTIONS_DEPENDED_ON_WORK_PROGRAM]: payload,
});

const changeSearchQuery = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const openDialog = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.EDUCATIONAL_PLAN_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const openDetailDialog = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.EDUCATIONAL_PLAN_DETAIL_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const openModuleDialog = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.EDUCATIONAL_PLAN_CREATE_MODULE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});
const openAddModuleDialog = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.EDUCATIONAL_PLAN_ADD_MODULE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const openDownloadModal = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.DOWNLOAD_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const closeModuleDialog = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.EDUCATIONAL_PLAN_CREATE_MODULE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: payload
    }
});

const closeAddModuleDialog = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.EDUCATIONAL_PLAN_ADD_MODULE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: payload
    }
});

const closeDialog = (state: educationalPlanState): educationalPlanState => ({
    ...state,
    [fields.EDUCATIONAL_PLAN_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
});

const closeDownloadModal = (state: educationalPlanState): educationalPlanState => ({
    ...state,
    [fields.DOWNLOAD_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
});

const closeDetailDialog = (state: educationalPlanState): educationalPlanState => ({
    ...state,
    [fields.EDUCATIONAL_PLAN_DETAIL_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
});

const changeSorting = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

const pageDown = (): educationalPlanState => initialState;

export const reducer = createReducer(initialState, {
    [actions.setEducationalPlans.type]: setEducationalPlans,
    [actions.setEducationalDetail.type]: setEducationalPlanDetail,

    [actions.setDirectionsDependedOnWorkProgram.type]: setDirectionsDependedOnWorkProgram,

    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,

    [actions.openDetailDialog.type]: openDetailDialog,
    [actions.closeDetailDialog.type]: closeDetailDialog,

    [actions.openCreateModuleDialog.type]: openModuleDialog,
    [actions.closeCreateModuleDialog.type]: closeModuleDialog,

    [actions.openAddModuleDialog.type]: openAddModuleDialog,
    [actions.closeAddModuleDialog.type]: closeAddModuleDialog,

    [actions.openDownloadModal.type]: openDownloadModal,
    [actions.closeDownloadModal.type]: closeDownloadModal,

    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
    [actions.setIsTrajectoryRoute.type]: setIsTrajectoryRoute,
    [actions.planTrajectorySetUserData.type]: planTrajectorySetUserData,
    [actions.planTrajectorySetDirection.type]: planTrajectorySetDirection,
    [actions.setNewPlanIdForRedirect.type]: setNewPlanIdForRedirect,

    [actions.pageDown.type]: pageDown,
});
