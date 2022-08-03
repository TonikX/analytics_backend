import {createLogic} from "redux-logic";
import userSettingsActions from "./actions";
import Service from './service';
import actions from "../../layout/actions";
import {fetchingTypes} from "./enum";

const service = new Service();

const updateUserEmail = createLogic({
    type: userSettingsActions.updateUserEmail.type,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_EMAIL_SETTINGS}));
        service.updateUserEmail(action.payload)
            .then(() => {
                dispatch(actions.fetchingSuccess(['На указанный email отправлено письмо с подтверждением']));
            }).catch(() => {
            dispatch(actions.fetchingSuccess(['Не удалось обновить email']));
        }).finally(() => {
            dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_EMAIL_SETTINGS}));
            return done();
        });
    }
});

const updateUserData = createLogic({
    type: userSettingsActions.updateUserData.type,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_DATA_SETTINGS}));

        service.updateUserData(action.payload)
            .then(() => {
                dispatch(actions.getUserData());
            }).finally(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_DATA_SETTINGS}));
                return done();
            });
    }
});

export default [
    updateUserEmail,
    updateUserData,
];
