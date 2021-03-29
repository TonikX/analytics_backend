import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import courseActions from './actions';

import Service from './service';

import {fetchingTypes, filterFields} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode, getFilters, getFilterSearchQuery} from "./getters";

const service = new Service();

const getCourses = createLogic({
    type: courseActions.getCourses.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);
        const filters = getFilters(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_COURSES}));

        service.getCourses(currentPage, searchQuery, sortingField, sortingMode,
            filters[filterFields.FILTERING_PLATFORM], filters[filterFields.FILTERING_INSTITUTION], filters[filterFields.FILTERING_LANGUAGE])
            .then((res) => {
                const courses = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(courseActions.setCourses(courses));
                dispatch(courseActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_COURSES}));
                return done();
            });
    }
});

const getPlatforms = createLogic({
    type: courseActions.getPlatforms.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const searchQuery = getFilterSearchQuery(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_PLATFORMS}));
        service.getPlatforms(searchQuery).then((res) => {
            const platforms = get(res, 'data.results', [])
            dispatch(courseActions.setPlatforms(platforms))
        }).catch((err) => {
            dispatch(actions.fetchingFailed(err))
        }).then(() => {
            dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_PLATFORMS}));
            return done();
        })
    }
})

const getInstitutions = createLogic({
    type: courseActions.getInstitutions.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const searchQuery = getFilterSearchQuery(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_INSTITUTIONS}));
        service.getInstitutions(searchQuery).then((res) => {
            const institutions = get(res, 'data.results', [])
            dispatch(courseActions.setInstitutions(institutions))
        }).catch((err) => {
            dispatch(actions.fetchingFailed(err))
        }).then(() => {
            dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_INSTITUTIONS}));
            return done();
        })
    }
})

export default [
    getCourses,
    getPlatforms,
    getInstitutions,
];
