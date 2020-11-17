import {createLogic} from "redux-logic";

import actions from '../../../layout/actions';
import folderActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
const service = new Service();

const getFolders = createLogic({
    type: folderActions.getFolders.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_FOLDERS}));

        service.getFolders()
            .then((res) => {
                dispatch(folderActions.setFolders(res.data.results));

                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_FOLDERS}));
                return done();
            });
    }
});

export default [
    getFolders
];
