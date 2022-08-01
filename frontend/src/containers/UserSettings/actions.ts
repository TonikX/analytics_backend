import {userSettingsActions} from "./types";
import {createAction} from "@reduxjs/toolkit";

const updateUserEmail = createAction('UPDATE_USER_EMAIL')

const actions: userSettingsActions = {
    updateUserEmail,
};

export default actions;
