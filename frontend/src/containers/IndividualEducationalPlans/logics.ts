import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import IndividualEducationalPlansActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getSearchQuery, getShowOnlyMy, getSortingField, getSortingMode} from "./getters";

const service = new Service();

const getIndividualEducationalPlans = createLogic({
    type: IndividualEducationalPlansActions.getIndividualEducationalPlans.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);
        const showOnlyMy = getShowOnlyMy(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_INDIVIDUAL_EDUCATIONAL_PLANS}));

        service.getIndividualEducationalPlans(currentPage, searchQuery, sortingField, sortingMode, showOnlyMy)
            .then((res) => {
                const courses = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(IndividualEducationalPlansActions.setIndividualEducationalPlans(courses));
                dispatch(IndividualEducationalPlansActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_INDIVIDUAL_EDUCATIONAL_PLANS}));
                return done();
            });
    }
});

const deleteIndividualEducationalPlans = createLogic({
    type: IndividualEducationalPlansActions.deleteIndividualEducationalPlans.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_INDIVIDUAL_EDUCATIONAL_PLAN}));

        service.deleteIndividualEducationalPlans(action.payload)
            .then((res) => {
                dispatch(IndividualEducationalPlansActions.getIndividualEducationalPlans());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_INDIVIDUAL_EDUCATIONAL_PLAN}));
                return done();
            });
    }
});

export default [
    getIndividualEducationalPlans,
    deleteIndividualEducationalPlans,
];
