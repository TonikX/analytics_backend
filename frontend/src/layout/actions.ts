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

const refreshToken = createAction('REFRESH_LOGIN');

const actions: GeneralActions = {
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
}

export default actions;
