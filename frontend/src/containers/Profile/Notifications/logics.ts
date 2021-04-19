import {createLogic} from "redux-logic";

import actions from '../../../layout/actions';
import notificationsActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
const service = new Service();

const getNotifications = createLogic({
    type: notificationsActions.getNotifications.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_NOTIFICATIONS}));

        service.getNotifications()
            .then((res) => {
                dispatch(notificationsActions.setNotifications(res.data.results));

                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_NOTIFICATIONS}));
                return done();
            });
    }
});

export default [
    getNotifications,
];
