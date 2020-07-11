import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'signUp';

export interface signUpState {

}

export const initialState = {
    [Enum.USERNAME_FIELD]: '',
    [Enum.FIRST_NAME_FIELD]: '',
    [Enum.LAST_NAME_FIELD]: '',
    [Enum.PASSWORD_FIELD]: '',
    [Enum.PASSWORD_REPEAT_FIELD]: '',
};

const changeField = (state: signUpState, {payload}: any) => ({
    ...state,
    [payload.destination]: payload.value
});

const pageDown = () => initialState;

export const reducer = createReducer(initialState, {
    [C.SIGN_UP_CHANGE_FIELD]: changeField,
    [C.SIGN_UP_PAGE_DOWN]: pageDown,
    [C.SIGN_UP_CLEAR_ALL_FIELDS]: pageDown,
});