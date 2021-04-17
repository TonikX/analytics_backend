import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import educationalPlanActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode} from "./getters";
import {appRouter} from "../../service/router-service";

const service = new Service();

const getEducationalPlansInDirection = createLogic({
    type: educationalPlanActions.getEducationalPlansInDirection.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_EDUCATION_PLANS_IN_DIRECTION}));

        service.getEducationalPlansInDirection(currentPage, searchQuery, sortingField, sortingMode)
            .then((res) => {
                const courses = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(educationalPlanActions.setEducationalPlansInDirection(courses));
                dispatch(educationalPlanActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_EDUCATION_PLANS_IN_DIRECTION}));
                return done();
            });
    }
});

const deleteEducationalPlanInDirection = createLogic({
    type: educationalPlanActions.deleteEducationalPlanInDirection.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const courseId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_EDUCATION_PLAN_IN_DIRECTION}));

        service.deleteEducationalPlansInDirection(courseId)
            .then((res) => {
                dispatch(educationalPlanActions.getEducationalPlansInDirection());
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
    type: educationalPlanActions.createNewEducationalPlanInDirection.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_EDUCATION_PLAN_IN_DIRECTION}));

        service.createEducationalPlansInDirection(course)
            .then((res) => {
                dispatch(educationalPlanActions.getEducationalPlansInDirection());
                dispatch(actions.fetchingSuccess());
                dispatch(educationalPlanActions.closeDialog());
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
    type: educationalPlanActions.changeEducationalPlanInDirection.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_EDUCATION_PLAN_IN_DIRECTION}));

        service.updateEducationalPlansInDirection(course)
            .then((res) => {
                dispatch(educationalPlanActions.getEducationalPlansInDirection());
                dispatch(actions.fetchingSuccess());
                dispatch(educationalPlanActions.closeDialog());
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

const createIndividualEducationalPlan = createLogic({
    type: educationalPlanActions.createIndividualEducationalPlan.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_INDIVIDUAL_EDUCATIONAL_PLAN}));

        service.createIndividualEducationalPlan(action.payload)
            .then((res: any) => {
                window.location.href = appRouter.getTrajectoryPlanDetailLink(res.data.id);
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_INDIVIDUAL_EDUCATIONAL_PLAN}));
                return done();
            });
    }
});

export default [
    getEducationalPlansInDirection,
    deleteEducationalPlanInDirection,
    createNewEducationalPlanInDirection,
    changeEducationalPlanInDirection,
    createIndividualEducationalPlan,
];
