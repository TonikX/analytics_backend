import {createLogic} from "redux-logic";

import actions from '../../../layout/actions'
import workProgramActions from '../actions'
import practiceActions from '../../Practice/actions'

import Service from '../service'

import {fetchingTypes} from "../enum"
import {getWorkProgramId} from "../getters";

const service = new Service();

const saveZUN = createLogic({
    type: workProgramActions.saveZUN.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const {workProgramId, practiceId, ...payload} = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.SAVE_ZUN}));

        service.saveZUN(payload, workProgramId, practiceId)
            .then(() => {
                if (workProgramId) {
                  dispatch(workProgramActions.getApWithCompetencesAndIndicatorsToWp())
                  dispatch(workProgramActions.getAllCompetencesAndIndicatorsForWp())
                }
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

const saveZUNforThisEP = createLogic({
    type: workProgramActions.saveZUNforThisEP.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const {workProgramId, practiceId, ...payload} = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.SAVE_ZUN_FOR_THIS_EP}));

        service.saveZUNforThisEP(payload, workProgramId, practiceId)
            .then((res) => {
                if (workProgramId) {
                  dispatch(workProgramActions.getApWithCompetencesAndIndicatorsToWp())
                  dispatch(workProgramActions.getAllCompetencesAndIndicatorsForWp())
                } else {
                  dispatch(practiceActions.getPractice(practiceId))
                }
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.SAVE_ZUN_FOR_THIS_EP}));
                return done();
            });
    }
});

const deleteZUN = createLogic({
    type: workProgramActions.deleteZUN.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_ZUN}));

        service.deleteZUN(action.payload)
            .then(() => {
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
            .then(() => {
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

const deleteIndicators = createLogic({
    type: workProgramActions.deleteIndicators.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_INDICATORS}));

        service.deleteIndicators(action.payload)
          .then(() => {
              dispatch(workProgramActions.getApWithCompetencesAndIndicatorsToWp())
              dispatch(workProgramActions.getAllCompetencesAndIndicatorsForWp())
              dispatch(actions.fetchingSuccess());
          })
          .catch((err) => {
              dispatch(actions.fetchingFailed(err));
          })
          .then(() => {
              dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_INDICATORS}));
              return done();
          });
    }
});

export default [
    saveZUN,
    deleteZUN,
    updateZUNFull,
    updateZUN,
    saveZUNforThisEP,
    deleteIndicators,
];
