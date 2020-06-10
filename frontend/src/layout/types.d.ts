import {fields} from './enum';

export interface LayoutActions {
    fetchingComponentTrue: any;
    fetchingComponentFalse: any;
    fetchingTrue: any;
    fetchingFalse: any;
    fetchingFailed: any;
    fetchingSuccess: any;
    setAuthTrue: any;
    setAuthFalse: any;
}

export interface layoutState {
    [fields.FETCHING]: { [key: string]: boolean };
    [fields.ERRORS]: Array<string>;
    [fields.SUCCESS_MESSAGES]: Array<string>;
    [fields.IS_AUTH]: boolean;
}