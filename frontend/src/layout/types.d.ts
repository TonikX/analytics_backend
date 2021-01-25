import {fields, UserFields} from './enum';

export interface GeneralActions {
    refreshToken: any;
    fetchingComponentTrue: any;
    fetchingComponentFalse: any;
    fetchingTrue: any;
    fetchingFalse: any;
    fetchingFailed: any;
    fetchingSuccess: any;
    setAuthTrue: any;
    setAuthFalse: any;
    getAllUsers: any;
    setAllUsers: any;
    getUserGroups: any;
    setUserGroups: any;
}

export interface layoutState {
    [fields.FETCHING]: { [key: string]: boolean };
    [fields.ERRORS]: Array<string>;
    [fields.SUCCESS_MESSAGES]: Array<string>;
    [fields.USER_GROUPS]: Array<string>;
    [fields.IS_AUTH]: boolean;
    [fields.USERS]: Array<any>; //todo: create user type
}

export type UserType = {
    [UserFields.FIRST_NAME]: string;
    [UserFields.LAST_NAME]: string;
    [UserFields.ID]: number;
    [UserFields.USERNAME]: string;
}