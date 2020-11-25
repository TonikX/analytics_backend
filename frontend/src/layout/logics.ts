import {createLogic} from "redux-logic";

import actions from './actions';

import Service from './service';

const service = new Service();

// const getUserData = createLogic({
//     type: C.GET_USER_DATA,
//     latest: true,
//     process({getState, action}, dispatch, done) {
//         dispatch(actions.fetchingTrue({destination: Enum.USER_DATA_FETCHING}));
//
//         service.getUserData()
//             .then((res) => {
//                 dispatch(actions.setUserData(res.data));
//                 dispatch(actions.fetchingSuccess());
//             })
//             .catch((err) => {
//                 dispatch(actions.fetchingFailed(err));
//             })
//             .then(() => {
//                 dispatch(actions.fetchingFalse({destination: Enum.USER_DATA_FETCHING}));
//                 return done();
//             });
//     }
// });

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

export default [
    getAllUsers,
    getUserGroups,
];
