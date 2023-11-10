import {createAction} from "@reduxjs/toolkit";

import {GeneralActions} from './types';

const fetchingTrue = createAction('FETCHING_TRUE');
const fetchingFalse = createAction('FETCHING_FALSE');
const fetchingFailed = createAction('FETCHING_FAILED');
const fetchingSuccess = createAction('FETCHING_SUCCESS');

const fetchingComponentFalse = createAction('FETCHING_COMPONENT_FALSE');
const fetchingComponentTrue = createAction('FETCHING_COMPONENT_TRUE');

const setAuthTrue = createAction('SET_AUTH_TRUE');
const setAuthFalse = createAction('SET_AUTH_FALSE');

const getAllUsers = createAction('GET_ALL_USERS');
const setAllUsers = createAction('SET_ALL_USERS');

const getUserGroups = createAction('GET_USER_GROUPS');
const setUserGroups = createAction('SET_USER_GROUPS');
const setUserNotificationsCount = createAction('SET_USER_NOTIFICATIONS_COUNT');

const getUserData = createAction('GET_USER_DATA');
const setUserData = createAction('SET_USER_DATA');

const refreshToken = createAction('REFRESH_LOGIN');

const setMockMenu = createAction('SET_MOCK_MENU');

const setShowBugModalTrue = createAction('SET_SHOW_BUG_MODAL_TRUE');
const setShowBugModalFalse = createAction('SET_SHOW_BUG_MODAL_FALSE');

const sendBug = createAction('SET_BUG');

const actions: GeneralActions = {
    setUserNotificationsCount,
    setShowBugModalTrue,
    setShowBugModalFalse,
    setMockMenu,
    refreshToken,
    fetchingComponentFalse,
    fetchingComponentTrue,
    fetchingTrue,
    fetchingFalse,
    fetchingFailed,
    fetchingSuccess,
    setAuthTrue,
    setAuthFalse,
    getAllUsers,
    setAllUsers,
    getUserGroups,
    setUserGroups,
    setUserData,
    getUserData,
    sendBug,
};

export default actions;
