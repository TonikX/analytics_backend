import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import competencesActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode} from "./getters";

const service = new Service();

const getIndicators = createLogic({
    type: competencesActions.getIndicators.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_INDICATORS}));

        service.getIndicators(currentPage, searchQuery, sortingField, sortingMode)
            .then((res) => {
                const courses = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(competencesActions.setIndicators(courses));
                dispatch(competencesActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_INDICATORS}));
                return done();
            });
    }
});

const getIndicatorsDependsCompetence = createLogic({
    type: competencesActions.getIndicatorsDependsCompetence.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const competence = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_INDICATORS_DEPENDS_COMPETENCE}));

        service.getIndicatorsDependsCompetence(competence)
            .then((res) => {
                const data = get(res, 'data', []);
                dispatch(competencesActions.setIndicators(data));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_INDICATORS_DEPENDS_COMPETENCE}));
                return done();
            });
    }
});

const deleteIndicator = createLogic({
    type: competencesActions.deleteIndicator.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const courseId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_INDICATOR}));

        service.deleteIndicator(courseId)
            .then((res) => {
                dispatch(competencesActions.getIndicators());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_INDICATOR}));
                return done();
            });
    }
});

const createNewIndicator = createLogic({
    type: competencesActions.createNewIndicator.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_INDICATOR}));

        service.createIndicator(course)
            .then((res) => {
                dispatch(competencesActions.getIndicators());
                dispatch(actions.fetchingSuccess());
                dispatch(competencesActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_INDICATOR}));
                return done();
            });
    }
});

const changeIndicator = createLogic({
    type: competencesActions.changeIndicator.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_INDICATOR}));

        service.updateIndicator(course)
            .then((res) => {
                dispatch(competencesActions.getIndicators());
                dispatch(actions.fetchingSuccess());
                dispatch(competencesActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_INDICATOR}));
                return done();
            });
    }
});

export default [
    getIndicators,
    deleteIndicator,
    createNewIndicator,
    changeIndicator,
    getIndicatorsDependsCompetence,
];
