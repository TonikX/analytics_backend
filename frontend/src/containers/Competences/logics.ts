import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import competencesActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode} from "./getters";

const service = new Service();

const getCompetences = createLogic({
    type: competencesActions.getCompetences.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_COMPETENCE}));

        service.getCompetences(currentPage, searchQuery, sortingField, sortingMode)
            .then((res) => {
                const courses = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(competencesActions.setCompetences(courses));
                dispatch(competencesActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_COMPETENCE}));
                return done();
            });
    }
});

const deleteCompetence = createLogic({
    type: competencesActions.deleteCompetence.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const courseId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_COMPETENCE}));

        service.deleteCompetence(courseId)
            .then((res) => {
                dispatch(competencesActions.getCompetences());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_COMPETENCE}));
                return done();
            });
    }
});

const createNewCompetence = createLogic({
    type: competencesActions.createNewCompetence.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_COMPETENCE}));

        service.createCompetence(course)
            .then((res) => {
                dispatch(competencesActions.getCompetences());
                dispatch(actions.fetchingSuccess());
                dispatch(competencesActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_COMPETENCE}));
                return done();
            });
    }
});

const changeCompetence = createLogic({
    type: competencesActions.changeCompetence.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_COMPETENCE}));

        service.updateCourse(course)
            .then((res) => {
                dispatch(competencesActions.getCompetences());
                dispatch(actions.fetchingSuccess());
                dispatch(competencesActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_COMPETENCE}));
                return done();
            });
    }
});

export default [
    getCompetences,
    deleteCompetence,
    createNewCompetence,
    changeCompetence,
];
