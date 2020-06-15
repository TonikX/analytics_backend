import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import competencesActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode} from "./getters";

const service = new Service();

const getEducationalPlansInDirection = createLogic({
    type: competencesActions.getEducationalPlansInDirection.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_EDUCATION_PLAN_IN_DIRECTION}));

        service.getEducationalPlansInDirection(currentPage, searchQuery, sortingField, sortingMode)
            .then((res) => {
                const courses = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(competencesActions.setEducationalPlansInDirection(courses));
                dispatch(competencesActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_EDUCATION_PLAN_IN_DIRECTION}));
                return done();
            });
    }
});

const deleteEducationalPlanInDirection = createLogic({
    type: competencesActions.deleteEducationalPlanInDirection.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const courseId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_EDUCATION_PLAN_IN_DIRECTION}));

        service.deleteEducationalPlansInDirection(courseId)
            .then((res) => {
                dispatch(competencesActions.getEducationalPlansInDirection());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_EDUCATION_PLAN_IN_DIRECTION}));
                return done();
            });
    }
});

const createNewEducationalPlanInDirection = createLogic({
    type: competencesActions.createNewEducationalPlanInDirection.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_EDUCATION_PLAN_IN_DIRECTION}));

        service.createEducationalPlansInDirection(course)
            .then((res) => {
                dispatch(competencesActions.getEducationalPlansInDirection());
                dispatch(actions.fetchingSuccess());
                dispatch(competencesActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_EDUCATION_PLAN_IN_DIRECTION}));
                return done();
            });
    }
});

const changeEducationalPlanInDirection = createLogic({
    type: competencesActions.changeEducationalPlanInDirection.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_EDUCATION_PLAN_IN_DIRECTION}));

        service.updateEducationalPlansInDirection(course)
            .then((res) => {
                dispatch(competencesActions.getEducationalPlansInDirection());
                dispatch(actions.fetchingSuccess());
                dispatch(competencesActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_EDUCATION_PLAN_IN_DIRECTION}));
                return done();
            });
    }
});

export default [
    getEducationalPlansInDirection,
    deleteEducationalPlanInDirection,
    createNewEducationalPlanInDirection,
    changeEducationalPlanInDirection,
];
