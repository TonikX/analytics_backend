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

const setUnreadChatsCount = createAction('SET_UNREAD_CHATS_COUNT');
const decreaseUnreadChatsCount = createAction('DECREASE_UNREAD_CHATS_COUNT');

const getUserData = createAction('GET_USER_DATA');
const setUserData = createAction('SET_USER_DATA');

const refreshToken = createAction('REFRESH_LOGIN');

const setMockMenu = createAction('SET_MOCK_MENU');

const validateAcademicPlans = createAction('VALIDATE_ACADEMIC_PLANS');

const getValidationResults = createAction('GET_VALIDATION_RESULTS');
const setValidationResults = createAction('SET_VALIDATION_RESULTS');

const getValidationRunResults = createAction('GET_VALIDATION_RUN_RESULTS');
const setValidationRunResults = createAction('SET_VALIDATION_RUN_RESULTS');

const actions: GeneralActions = {
    setUserNotificationsCount,
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
    setUnreadChatsCount,
    decreaseUnreadChatsCount,
    validateAcademicPlans,
    getValidationResults,
    setValidationResults,
    getValidationRunResults,
    setValidationRunResults,
};

export default actions;
