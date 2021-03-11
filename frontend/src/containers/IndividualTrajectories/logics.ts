import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import individualTrajectoriesActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getSearchQuery, getShowOnlyMy, getSortingField, getSortingMode} from "./getters";

const service = new Service();

const getIndividualTrajectories = createLogic({
    type: individualTrajectoriesActions.getIndividualTrajectories.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);
        const showOnlyMy = getShowOnlyMy(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_INDIVIDUAL_TRAJECTORIES}));

        service.getIndividualTrajectories(currentPage, searchQuery, sortingField, sortingMode, showOnlyMy)
            .then((res) => {
                const courses = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(individualTrajectoriesActions.setIndividualTrajectories(courses));
                dispatch(individualTrajectoriesActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_INDIVIDUAL_TRAJECTORIES}));
                return done();
            });
    }
});

const deleteIndividualTrajectories = createLogic({
    type: individualTrajectoriesActions.deleteIndividualTrajectories.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_INDIVIDUAL_TRAJECTORY}));

        service.deleteIndividualTrajectories(action.payload)
            .then((res) => {
                dispatch(individualTrajectoriesActions.getIndividualTrajectories());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_INDIVIDUAL_TRAJECTORY}));
                return done();
            });
    }
});

export default [
    getIndividualTrajectories,
    deleteIndividualTrajectories,
];
