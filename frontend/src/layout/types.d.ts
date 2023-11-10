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
    setUserData: any;
    getUserData: any;
    setUserGroups: any;
    setMockMenu: any;
    setUserNotificationsCount: any;
    setShowBugModalTrue: any;
    setShowBugModalFalse: any;
    sendBug: any;
}

export interface layoutState {
    [fields.FETCHING]: { [key: string]: boolean };
    [fields.ERRORS]: Array;
    [fields.SUCCESS_MESSAGES]: Array;
    [fields.USER_GROUPS]: Array;
    [fields.IS_AUTH]: boolean;
    [fields.SHOW_BUG_MODAL]: boolean;
    [fields.NOTIFICATIONS_COUNT]: number;
    [fields.MOCK_MENU]: Array<number>;
    [fields.USERS]: Array<any>; //todo: create user type
    [fields.USER_DATA]: any;
}

export type UserType = {
    [UserFields.FIRST_NAME]: string;
    [UserFields.LAST_NAME]: string;
    [UserFields.ISU_NUMBER]: string;
    [UserFields.ID]: number;
    [UserFields.USERNAME]: string;
}
