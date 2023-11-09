import {createLogic} from "redux-logic";

import actions from './actions';
import profileActions from '../containers/Profile/Folders/actions';

import Service from './service';
import get from "lodash/get";
import UserService from "../service/user-service";

const service = new Service();

const userService = new UserService();

const getUserData = createLogic({
    type: actions.getUserData.type,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: 'USER_DATA_FETCHING'}));

        service.getUserData()
            .then((res) => {
                dispatch(actions.setUserData(res.data));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: 'USER_DATA_FETCHING'}));
                return done();
            });
    }
});

const getAllUsers = createLogic({
    type: actions.getAllUsers.type,
    latest: true,
    process({getState, action}, dispatch, done) {
        //@ts-ignore
        const searchText = action.payload;

        service.getAllUsers(searchText)
            .then((res) => {
                dispatch(actions.setAllUsers(res.data.results));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {

                return done();
            });
    }
});

const getUserGroups = createLogic({
    type: actions.getUserGroups.type,
    latest: true,
    process({getState, action}, dispatch, done) {
        service.getUserGroups()
            .then((res) => {
                dispatch(actions.setUserGroups(res.data.groups));
                dispatch(actions.setUserNotificationsCount(res.data.notification_nums));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                return done();
            });
    }
});

const refreshToken = createLogic({
    type: actions.refreshToken.type,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: 'refresh'}));

        service.refreshToken()
            .then((res) => {
                const token = get(res, 'data.access', '');

                userService.setToken(token);
                dispatch(actions.getUserGroups());
                dispatch(actions.getUserData());
                dispatch(profileActions.getFolders());
                dispatch(actions.fetchingSuccess());

                dispatch(actions.fetchingFalse({destination: 'refresh'}));
            })
            .catch((err) => {
                dispatch(actions.setAuthFalse());
                userService.logout();
                dispatch(actions.fetchingFalse({destination: 'refresh'}));
            })
            .then(() => {
                return done();
            });
    }
});

const sendBug = createLogic({
  type: actions.sendBug.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: 'refresh'}));

    const {title, description, selectedFile} = action.payload;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', selectedFile);

    service.sendBug(formData)
      .then((res) => {
        dispatch(actions.fetchingFalse({destination: 'refresh'}));
        dispatch(actions.fetchingSuccess(['Сообщение о баге успешно отправлено']));
        dispatch(actions.setShowBugModalFalse());
      })
      .catch((err) => {
        dispatch(actions.fetchingFalse({destination: 'refresh'}));
      })
      .then(() => {
        return done();
      });
  }
});

export default [
    getAllUsers,
    getUserGroups,
    refreshToken,
    getUserData,
    sendBug
];
