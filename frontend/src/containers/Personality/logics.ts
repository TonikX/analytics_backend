import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import personalityActions from './actions';

import Service from './service';
import { fetchingTypes } from "./enum";
import { update } from "lodash";

const service = new Service();

const getPersonality = createLogic({
    type: personalityActions.getPersonality.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_PERSONALITY}));
        const persId: number = action.payload;
        service.getPersonality(persId)
            .then((res) => {
                const personality = get(res, 'data', {});

                dispatch(personalityActions.setPersonality(personality));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_PERSONALITY}));
                return done();
            })
    }
});

const updateGroups = createLogic({
    type: personalityActions.updateGroups.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState()

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_GROUPS}))

        service.updateGroups(action.payload)
            .then((res) => {
                dispatch(personalityActions.getPersonality(action.payload.id));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_GROUPS}))
                return done();
            })
    }
})

export default [
    getPersonality,
    updateGroups
]