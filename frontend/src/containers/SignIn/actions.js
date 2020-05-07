import createAction from "../../store/createAction";

import * as C from './constants';

const signInChangeField = createAction(C.SIGN_IN_CHANGE_FIELD, 'payload');

const signIn = createAction(C.SIGN_IN, 'payload');
const signInPageDown = createAction(C.SIGN_IN_PAGE_DOWN, 'payload');

export default {
    signInChangeField,
    signIn,
    signInPageDown,
}