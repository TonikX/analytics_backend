import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import competencesActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode} from "./getters";

const service = new Service();

const getEducationalPlan = createLogic({
    type: competencesActions.getEducationalPlan.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_EDUCATIONAL_PLAN}));

        service.getEducationalPlan(currentPage, searchQuery, sortingField, sortingMode)
            .then((res) => {
                const courses = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(competencesActions.setEducationalPlan(courses));
                dispatch(competencesActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_EDUCATIONAL_PLAN}));
                return done();
            });
    }
});

const deleteEducationalPlan = createLogic({
    type: competencesActions.deleteEducationalPlan.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const courseId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_EDUCATIONAL_PLAN}));

        service.deleteEducationalPlan(courseId)
            .then((res) => {
                dispatch(competencesActions.getEducationalPlan());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_EDUCATIONAL_PLAN}));
                return done();
            });
    }
});

const createNewEducationalPlan = createLogic({
    type: competencesActions.createNewEducationalPlan.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_EDUCATIONAL_PLAN}));

        service.createEducationalPlan(course)
            .then((res) => {
                dispatch(competencesActions.getEducationalPlan());
                dispatch(actions.fetchingSuccess());
                dispatch(competencesActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_EDUCATIONAL_PLAN}));
                return done();
            });
    }
});

const changeEducationalPlan = createLogic({
    type: competencesActions.changeEducationalPlan.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_EDUCATIONAL_PLAN}));

        service.updateEducationalPlan(course)
            .then((res) => {
                dispatch(competencesActions.getEducationalPlan());
                dispatch(actions.fetchingSuccess());
                dispatch(competencesActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_EDUCATIONAL_PLAN}));
                return done();
            });
    }
});

export default [
    getEducationalPlan,
    deleteEducationalPlan,
    createNewEducationalPlan,
    changeEducationalPlan,
];
