import {createLogic} from "redux-logic";

import * as C from './constants';
import actions from '../../layout/actions';
import signUpPageActions from './actions';

import Service from './service';

import {getFormDataForSignUp} from "./getters";
import * as Enum from "./enum";

const service = new Service();

const signUp = createLogic({
    type: C.SIGN_UP,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();
        const formData = getFormDataForSignUp(state);

        dispatch(actions.fetchingTrue({destination: Enum.SIGN_UP_FETCHING}));

        service.signUp(formData)
            .then((res) => {
                dispatch(actions.fetchingSuccess(['Вы успешно зарегистрированы!']));
                dispatch(signUpPageActions.signUpClearAllFields());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.SIGN_UP_FETCHING}));
                return done();
            });
    }
});

export default [
    signUp,
];
