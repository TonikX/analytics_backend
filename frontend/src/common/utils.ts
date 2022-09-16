import get from 'lodash/get';

import {UserType} from "../layout/types";
import {UserFields} from "../layout/enum";
import {SortingType, Types} from "../components/SortingButton/types";

export const checkUrl = (url: string) => {
    const regexp =  /^(https?:\/\/)/;

    return regexp.test(url);
};

export const isValidEmail = (email: string) => {
    const REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return REGEXP.test(email);
};

export const FULL_DATE_FORMAT = 'DD.MM.YYYY';
export const FULL_DATE_FORMAT_WITH_TIME = 'DD.MM.YYYY HH:mm';
export const YEAR_DATE_FORMAT = 'YYYY';

export const getUserFullName = (user: UserType) => `${get(user, [UserFields.FIRST_NAME], '')} ${get(user, [UserFields.LAST_NAME], '')}`;

export const getSortingSymbol = (sortingMode: SortingType): '-'|'+'|'' => sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

export const isStringValueValid = (value: string) => value.trim() && get(value, 'length', 0) !== 0;

export const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
