import {UserType} from "../layout/types";
import {UserFields} from "../layout/enum";

export const checkUrl = (url: string) => {
    const regexp =  /^(https?:\/\/)/;

    if (regexp.test(url)){
        return true;
    } else {
        return false;
    }
}

export const FULL_DATE_FORMAT = 'DD.MM.YYYY';
export const YEAR_DATE_FORMAT = 'YYYY';

export const getUserFullName = (user: UserType) => `${user[UserFields.FIRST_NAME]} ${user[UserFields.LAST_NAME]}`;