import {EmailWidgetActions} from "./types";
import {createAction} from "@reduxjs/toolkit";

const sendEmail = createAction('SEND_EMAIL');

const actions: EmailWidgetActions = {
    sendEmail
};

export default actions;
