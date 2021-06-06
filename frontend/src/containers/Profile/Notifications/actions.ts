import {createAction} from "@reduxjs/toolkit";

import {NotificationsActions} from './types';

const getNotifications = createAction('GET_NOTIFICATIONS');
const setNotifications = createAction('SET_NOTIFICATIONS');

const actions: NotificationsActions = {
    getNotifications,
    setNotifications,
};

export default actions;