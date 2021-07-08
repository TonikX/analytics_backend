import {createLogic} from "redux-logic";

import actions from '../../../layout/actions';
import notificationsActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import get from "lodash/get";
import {getCurrentPage} from "./getters";
const service = new Service();

const getNotifications = createLogic({
    type: notificationsActions.getNotifications.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const currentPage = getCurrentPage(getState())
        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_NOTIFICATIONS}));

        service.getNotifications(currentPage)
            .then((res) => {
                const allPages = Math.ceil(get(res, 'data.count', 0));
                dispatch(notificationsActions.setNotifications(res.data.results));
                dispatch(notificationsActions.changeAllCount(allPages));

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
