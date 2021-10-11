import createReducer from "../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

export const GENERAL_PATH = 'main';

export const initialState = {
    [fields.FETCHING]: {
        'refresh': true
    },
    [fields.FETCHING_COMPONENT]: {},
    [fields.ERRORS]: [],
    [fields.SUCCESS_MESSAGES]: [],
    [fields.IS_AUTH]: false,
    [fields.USERS]: [],
    [fields.USER_GROUPS]: [],
    [fields.USER_DATA]: {},
    [fields.NOTIFICATIONS_COUNT]: 0,
    [fields.MOCK_MENU]: [],
};

const fetchingTrue = (state, {payload}) => ({
    ...state,
    [fields.FETCHING]: {
        ...state[fields.FETCHING],
        [payload.destination]: true
    },
});

const fetchingFalse = (state, {payload}) => ({
    ...state,
    [fields.FETCHING]: {
        ...state[fields.FETCHING],
        [payload.destination]: false
    }
});

const fetchingComponentTrue = (state, {payload}) => ({
    ...state,
    [fields.FETCHING_COMPONENT]: {
        ...state[fields.FETCHING_COMPONENT],
        [payload.destination]: true
    },
});

const fetchingComponentFalse = (state, {payload}) => ({
    ...state,
    [fields.FETCHING_COMPONENT]: {
        ...state[fields.FETCHING_COMPONENT],
        [payload.destination]: false
    }
});

const fetchingFailed = (state, {payload}) => ({
    ...state,
    [fields.ERRORS]: payload,
});

const fetchingSuccess = (state, {payload}) => ({
    ...state,
    [fields.SUCCESS_MESSAGES]: payload,
});

const setAllUsers = (state, {payload}) => ({
    ...state,
    [fields.USERS]: payload,
});

const setUserGroups = (state, {payload}) => ({
    ...state,
    [fields.USER_GROUPS]: payload,
});

const setUserData = (state, {payload}) => ({
    ...state,
    [fields.USER_DATA]: payload,
});

const setMockMenu = (state, {payload}) => ({
    ...state,
    [fields.MOCK_MENU]: payload,
});

const setUserNotificationsCount = (state, {payload}) => ({
    ...state,
    [fields.NOTIFICATIONS_COUNT]: payload,
});

const setAuthTrue = (state) => ({
    ...state,
    [fields.IS_AUTH]: true,
});

const setAuthFalse = (state) => ({
    ...state,
    [fields.IS_AUTH]: false,
});

export const reducer = createReducer(initialState, {
    [actions.fetchingComponentTrue.type]: fetchingComponentTrue,
    [actions.fetchingTrue.type]: fetchingTrue,
    [actions.fetchingComponentFalse.type]: fetchingComponentFalse,
    [actions.fetchingFalse.type]: fetchingFalse,
    [actions.fetchingFailed.type]: fetchingFailed,
    [actions.fetchingSuccess.type]: fetchingSuccess,
    [actions.setAuthFalse.type]: setAuthFalse,
    [actions.setAuthTrue.type]: setAuthTrue,
    [actions.setAllUsers.type]: setAllUsers,
    [actions.setUserGroups.type]: setUserGroups,
    [actions.setUserData.type]: setUserData,
    [actions.setMockMenu.type]: setMockMenu,
    [actions.setUserNotificationsCount.type]: setUserNotificationsCount,
});
