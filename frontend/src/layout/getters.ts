import get from 'lodash/get';

import {rootState} from '../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {fields} from './enum';

import {layoutState} from './types';
import {SelectorListType} from "../components/SearchSelector/types";

const getStateData = (state: rootState): layoutState => get(state, GENERAL_PATH);
export const getFetching = (state: rootState): layoutState[fields.FETCHING] => get(getStateData(state), fields.FETCHING, {});
export const getFetchingComponent = (state: rootState): layoutState[fields.FETCHING] => get(getStateData(state), fields.FETCHING_COMPONENT, {});
export const getErrors = (state: rootState): layoutState[fields.ERRORS] => get(getStateData(state), fields.ERRORS, []);
export const getSuccessMessages = (state: rootState): layoutState[fields.SUCCESS_MESSAGES] => get(getStateData(state), fields.SUCCESS_MESSAGES, []);
export const getAuth = (state: rootState): layoutState[fields.IS_AUTH] => get(getStateData(state), fields.IS_AUTH, false);
export const getShowBugModal = (state: rootState): layoutState[fields.SHOW_BUG_MODAL] => get(getStateData(state), fields.SHOW_BUG_MODAL, false);
export const getMockMenu = (state: rootState): layoutState[fields.MOCK_MENU] => get(getStateData(state), fields.MOCK_MENU, []);
export const getUserGroups = (state: rootState): layoutState[fields.USER_GROUPS] => get(getStateData(state), fields.USER_GROUPS, []);
export const getUserData = (state: rootState): layoutState[fields.USER_DATA] => get(getStateData(state), fields.USER_DATA, []);
export const getNotificationCount = (state: rootState): layoutState[fields.NOTIFICATIONS_COUNT] => get(getStateData(state), fields.NOTIFICATIONS_COUNT, 0);
export const getUsers = (state: rootState): layoutState[fields.USERS] => get(getStateData(state), fields.USERS, []);
export const getUsersForSelector = (state: rootState): layoutState[fields.USERS] => getUsers(state).map((user: any): SelectorListType => ({
    //@ts-ignore
    value: user.id,
    label: `${user['first_name']} ${user['last_name']}`,
}));

export const isFetching = (state: rootState) => {
    const fetching = getFetching(state);

    return Object.keys(fetching).some(key => fetching[key] === true);
};

export const isFetchingComponentByKey = (state: rootState, key: string) => {
    const fetching = getFetchingComponent(state);

    return fetching[key];
};

export const isFetchingByKey = (state: rootState, key: string) => {
    const fetching = getFetching(state);

    return fetching[key];
};
