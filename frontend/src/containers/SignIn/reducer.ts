import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'signIn';

export interface signInState {

}

export const initialState = {
    [Enum.USERNAME_FIELD]: '',
    [Enum.PASSWORD_FIELD]: '',
};

const changeField = (state:signInState, {payload}: any): signInState => ({
    ...state,
    [payload.destination]: payload.value
});

const pageDown = () => initialState;

export const reducer = createReducer(initialState, {
    [C.SIGN_IN_CHANGE_FIELD]: changeField,
    [C.SIGN_IN_PAGE_DOWN]: pageDown
});