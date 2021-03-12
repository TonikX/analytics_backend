import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import courseActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode} from "./getters";

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

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_COURSES}));

        service.getCourses(currentPage, searchQuery, sortingField, sortingMode)
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
// ONLY 1st PAGE
const getPlatforms = createLogic({
    type: courseActions.getPlatforms.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_PLATFORMS}));
        service.getPlatforms().then((res) => {
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

// ONLY 1st PAGE
const getInstitutions = createLogic({
    type: courseActions.getPlatforms.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_INSTITUTIONS}));
        service.getInstitutions().then((res) => {
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
