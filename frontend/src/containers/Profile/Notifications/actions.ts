import {createAction} from "@reduxjs/toolkit";

import {NotificationsActions} from './types';

const getNotifications = createAction('GET_NOTIFICATIONS');
const setNotifications = createAction('SET_NOTIFICATIONS');
const changeAllCount = createAction('NOTIFICATIONS_CHANGE_ALL_COUNT');
const changeCurrentPage = createAction('NOTIFICATIONS_CHANGE_CURRENT_PAGE');

const actions: NotificationsActions = {
    getNotifications,
    setNotifications,
    changeAllCount,
    changeCurrentPage,
};

export default actions;