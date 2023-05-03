import {createLogic} from "redux-logic";

import actions from '../../../layout/actions'
import workProgramActions from '../actions'

import Service from '../service'

import {fetchingTypes} from "../enum"
import {getWorkProgramId} from "../getters";

const service = new Service();

const saveZUN = createLogic({
    type: workProgramActions.saveZUN.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState()
        const workProgramId = getWorkProgramId(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.SAVE_ZUN}));

        service.saveZUN(action.payload, workProgramId)
            .then((res) => {
                dispatch(workProgramActions.getApWithCompetencesAndIndicatorsToWp())
                dispatch(workProgramActions.getAllCompetencesAndIndicatorsForWp())
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
                dispatch(workProgramActions.getApWithCompetencesAndIndicatorsToWp())
                dispatch(workProgramActions.getAllCompetencesAndIndicatorsForWp())
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

const updateZUNFull = createLogic({
    type: workProgramActions.updateZUNFull.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_ZUN}));

        service.updateZUNFull(action.payload)
            .then((res) => {
                dispatch(workProgramActions.getApWithCompetencesAndIndicatorsToWp())
                dispatch(workProgramActions.getAllCompetencesAndIndicatorsForWp())
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

const updateZUN = createLogic({
    type: workProgramActions.updateZUN.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_ZUN}));

        service.updateZUN(action.payload, getWorkProgramId(getState()))
            .then((res) => {
                dispatch(workProgramActions.getApWithCompetencesAndIndicatorsToWp())
                dispatch(workProgramActions.getAllCompetencesAndIndicatorsForWp())
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
    updateZUNFull,
    updateZUN,
];
