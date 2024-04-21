import createReducer from "../../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {notificationsState} from "./types";

export const GENERAL_PATH = 'notifications';

export const initialState: notificationsState = {
    [fields.NOTIFICATIONS]: [],
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
};

const setNotifications = (state: notificationsState, {payload}: any): notificationsState => ({
    ...state,
    [fields.NOTIFICATIONS]: payload,
});
const changeCurrentPage = (state: notificationsState, {payload}: any): notificationsState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: notificationsState, {payload}: any): notificationsState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

export const reducer = createReducer(initialState, {
    [actions.setNotifications.type]: setNotifications,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
});
