import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import personalityActions from './actions';

import Service from './service';

import {fetchingTypes, filterFields} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode, getFilters, getFilterSearchQuery} from "./getters";

const service = new Service();

const getPersonalities = createLogic({
    type: personalityActions.getPersonalities.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);
        const filters = getFilters(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_PERSONALITIES}));
        service.getPersonalities(currentPage, searchQuery, sortingField, sortingMode, filters[filterFields.FILTERING_GROUPS])
        .then((res) => {
            const personalities = get(res, 'data.results', []);
            const allPages = Math.ceil(get(res, 'data.count', 0));
            // console.log("logic:", personalities)
            
            dispatch(personalityActions.setPersonalities(personalities));
            
            dispatch(personalityActions.changeAllCount(allPages));
            dispatch(actions.fetchingSuccess());
        })
        .catch((err) => {
            dispatch(actions.fetchingFailed(err))
        })
        .then(() => {
            dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_PERSONALITIES}));
            return done();
        });
    }
});

export default [
    getPersonalities
]