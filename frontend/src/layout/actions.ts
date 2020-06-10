import {createAction} from "@reduxjs/toolkit";

import {LayoutActions} from './types';

const fetchingTrue = createAction<string>('FETCHING_TRUE');
const fetchingFalse = createAction<string>('FETCHING_FALSE');
const fetchingFailed = createAction<string>('FETCHING_FAILED');
const fetchingSuccess = createAction<string>('FETCHING_SUCCESS');

const fetchingComponentFalse = createAction<string>('FETCHING_COMPONENT_FALSE');
const fetchingComponentTrue = createAction<string>('FETCHING_COMPONENT_TRUE');

const setAuthTrue = createAction<string>('SET_AUTH_TRUE');
const setAuthFalse = createAction<string>('SET_AUTH_FALSE');

const actions: LayoutActions = {
    fetchingComponentFalse,
    fetchingComponentTrue,
    fetchingTrue,
    fetchingFalse,
    fetchingFailed,
    fetchingSuccess,
    setAuthTrue,
    setAuthFalse
}

export default actions;
