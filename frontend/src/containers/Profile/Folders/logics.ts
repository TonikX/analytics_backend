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

const addToFolder = createLogic({
    type: folderActions.addToFolder.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const {rating, relationId, folder, comment, type, callback} = action.payload;
        dispatch(actions.fetchingTrue({destination: fetchingTypes.ADD_TO_FOLDER}));

        service.addToFolder(folder, rating, relationId, comment, type)
            .then((res) => {
                dispatch(folderActions.closeDialog());
                dispatch(actions.fetchingSuccess());

                if (callback){
                    dispatch(callback(relationId));
                }
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.ADD_TO_FOLDER}));
                return done();
            });
    }
});

const removeFromFolder = createLogic({
    type: folderActions.removeFromFolder.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const {id, callback, type, relationId} = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.REMOVE_FROM_FOLDER}));

        service.removeFromFolder(id, type)
            .then((res) => {
                dispatch(actions.fetchingSuccess());

                if (callback){
                    dispatch(callback(relationId));
                } else {
                    dispatch(folderActions.getFolders());
                }
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.REMOVE_FROM_FOLDER}));
                return done();
            });
    }
});

const createFolder = createLogic({
    type: folderActions.createFolder.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const {name, description} = action.payload;
        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_FOLDER}));

        service.createFolder(name, description)
            .then((res) => {
                dispatch(folderActions.closeDialog());
                dispatch(actions.fetchingSuccess());
                dispatch(folderActions.getFolders());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_FOLDER}));
                return done();
            });
    }
});

const deleteFolder = createLogic({
    type: folderActions.deleteFolder.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_FOLDER}));

        service.deleteFolder(action.payload)
            .then((res) => {
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_FOLDER}));
                return done();
            });
    }
});

export default [
    getFolders,
    addToFolder,
    removeFromFolder,
    createFolder,
    deleteFolder,
];
