import {createAction} from "@reduxjs/toolkit";

import {GeneralActions} from './types';

const fetchingTrue = createAction<string>('FETCHING_TRUE');
const fetchingFalse = createAction<string>('FETCHING_FALSE');
const fetchingFailed = createAction<string>('FETCHING_FAILED');
const fetchingSuccess = createAction<string>('FETCHING_SUCCESS');

const fetchingComponentFalse = createAction<string>('FETCHING_COMPONENT_FALSE');
const fetchingComponentTrue = createAction<string>('FETCHING_COMPONENT_TRUE');

const setAuthTrue = createAction<string>('SET_AUTH_TRUE');
const setAuthFalse = createAction<string>('SET_AUTH_FALSE');

const getAllUsers = createAction<string>('GET_ALL_USERS');
const setAllUsers = createAction<string>('SET_ALL_USERS');

const getUserGroups = createAction<string>('GET_USER_GROUPS');
const setUserGroups = createAction<string>('SET_USER_GROUPS');

const actions: GeneralActions = {
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
