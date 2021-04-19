import createReducer from "../../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {notificationsState} from "./types";

export const GENERAL_PATH = 'notifications';

export const initialState: notificationsState = {
    [fields.NOTIFICATIONS]: [],
};

const setNotifications = (state: notificationsState, {payload}: any): notificationsState => ({
    ...state,
    [fields.NOTIFICATIONS]: payload,
});

export const reducer = createReducer(initialState, {
    [actions.setNotifications.type]: setNotifications,
});