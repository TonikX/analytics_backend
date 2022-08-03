import {userSettingsActions} from "./types";
import {createAction} from "@reduxjs/toolkit";

const updateUserEmail = createAction('UPDATE_USER_EMAIL');
const updateUserData = createAction('UPDATE_USER_DATA');

const actions: userSettingsActions = {
    updateUserEmail,
    updateUserData,
};

export default actions;
