import {createLogic} from "redux-logic";

import actions from '../../../layout/actions'
import workProgramActions from '../actions'

import Service from '../service'

import {fetchingTypes} from "../enum"

const service = new Service();

const saveZUN = createLogic({
    type: workProgramActions.saveZUN.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState()

        dispatch(actions.fetchingTrue({destination: fetchingTypes.SAVE_ZUN}));

        service.saveZUN(action.payload)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.SAVE_ZUN}));
                return done();
            });
    }
});

const deleteZUN = createLogic({
    type: workProgramActions.deleteZUN.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState()

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_ZUN}));

        service.deleteZUN(action.payload)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_ZUN}));
                return done();
            });
    }
});

const updateZUN = createLogic({
    type: workProgramActions.updateZUN.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState()

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_ZUN}));

        service.updateZUN(action.payload)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_ZUN}));
                return done();
            });
    }
});

export default [
    saveZUN,
    deleteZUN,
    updateZUN,
];
