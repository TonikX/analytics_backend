import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import expertisesActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode} from "./getters";

const service = new Service();

const getExpertisesList = createLogic({
    type: expertisesActions.getExpertisesList.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_EXPERTISES}));

        service.getExpertises(currentPage, searchQuery, sortingField, sortingMode)
            .then((res) => {
                const results = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(expertisesActions.setExpertisesList(results));
                dispatch(expertisesActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_EXPERTISES}));
                return done();
            });
    }
});


export default [
    getExpertisesList,
];
