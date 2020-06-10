import get from 'lodash/get';
import {GENERAL_PATH} from "./reducer";
import * as Enum from './enum';

const getStateData = (state) => get(state, GENERAL_PATH, {});

export const getFieldValue = (state, field) => get(getStateData(state), field, '');

export const getFormDataForSignUp = (state) => {
    const formData = new FormData();

    formData.append(Enum.PASSWORD_FIELD, getFieldValue(state, Enum.PASSWORD_FIELD));
    formData.append(Enum.USERNAME_FIELD, getFieldValue(state, Enum.USERNAME_FIELD));
    formData.append(Enum.FIRST_NAME_FIELD, getFieldValue(state, Enum.FIRST_NAME_FIELD));
    formData.append(Enum.LAST_NAME_FIELD, getFieldValue(state, Enum.LAST_NAME_FIELD));
    formData.append(Enum.GROUP_FIELD, getFieldValue(state, Enum.GROUP_FIELD));
    formData.append(Enum.PASSWORD_REPEAT_FIELD, getFieldValue(state, Enum.PASSWORD_REPEAT_FIELD));

    return formData;
};

export const isPasswordError = (state) => {
    const password = getFieldValue(state, Enum.PASSWORD_FIELD);
    const passwordRepeat = getFieldValue(state, Enum.PASSWORD_REPEAT_FIELD);

    return password.length > 0 && passwordRepeat.length > 0 && password !== passwordRepeat;
};