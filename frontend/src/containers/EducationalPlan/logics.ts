import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import planActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getEducationalPlanDetailId, getSearchQuery, getSortingField, getSortingMode} from "./getters";

const service = new Service();

const getEducationalPlans = createLogic({
    type: planActions.getEducationalPlans.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_EDUCATIONAL_PLANS}));

        service.getEducationalPlan(currentPage, searchQuery, sortingField, sortingMode)
            .then((res) => {
                const educationalPlans = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(planActions.setEducationalPlans(educationalPlans));
                dispatch(planActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_EDUCATIONAL_PLANS}));
                return done();
            });
    }
});

const getEducationalPlanDetail = createLogic({
    type: planActions.getEducationalDetail.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        //@ts-ignore
        const planId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_EDUCATIONAL_PLAN_DETAIL}));

        service.getEducationalPlanDetail(planId)
            .then((res) => {
                const plan = get(res, 'data', {});

                dispatch(planActions.setEducationalDetail(plan));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_EDUCATIONAL_PLAN_DETAIL}));
                return done();
            });
    }
});

const deleteEducationalPlan = createLogic({
    type: planActions.deleteEducationalPlan.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const planId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_EDUCATIONAL_PLAN}));

        service.deleteEducationalPlan(planId)
            .then((res) => {
                dispatch(planActions.getEducationalPlans());
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
    type: planActions.createNewEducationalPlan.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const educationalPlan = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_EDUCATIONAL_PLAN}));

        service.createEducationalPlan(educationalPlan)
            .then((res) => {
                dispatch(planActions.getEducationalPlans());
                dispatch(actions.fetchingSuccess());
                dispatch(planActions.closeDialog());
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
    type: planActions.changeEducationalPlan.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const educationalPlan = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_EDUCATIONAL_PLAN}));

        service.updateEducationalPlan(educationalPlan)
            .then((res) => {
                dispatch(planActions.getEducationalPlans());
                dispatch(actions.fetchingSuccess());
                dispatch(planActions.closeDialog());
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

const createBlockOfWorkPrograms = createLogic({
    type: planActions.createBlockOfWorkPrograms.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const moduleWithBlocks = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_BLOCK_OF_WORK_PROGRAMS}));

        service.createBlockOfWorkPrograms(moduleWithBlocks)
            .then((res) => {
                const planId = getEducationalPlanDetailId(getState());
                dispatch(planActions.getEducationalDetail(planId));
                dispatch(actions.fetchingSuccess());
                dispatch(planActions.closeDetailDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_BLOCK_OF_WORK_PROGRAMS}));
                return done();
            });
    }
});

const changeBlockOfWorkPrograms = createLogic({
    type: planActions.changeBlockOfWorkPrograms.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const moduleWithBlocks = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CHANGE_BLOCK_OF_WORK_PROGRAMS}));

        service.changeBlockOfWorkPrograms(moduleWithBlocks)
            .then((res) => {
                const planId = getEducationalPlanDetailId(getState());
                dispatch(planActions.getEducationalDetail(planId));
                dispatch(actions.fetchingSuccess());
                dispatch(planActions.closeDetailDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CHANGE_BLOCK_OF_WORK_PROGRAMS}));
                return done();
            });
    }
});

const deleteBlockOfWorkPrograms = createLogic({
    type: planActions.deleteBlockOfWorkPrograms.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const blockId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_BLOCK_OF_WORK_PROGRAMS}));

        service.deleteBlockOfWorkPrograms(blockId)
            .then((res) => {
                const planId = getEducationalPlanDetailId(getState());
                dispatch(planActions.getEducationalDetail(planId));
                dispatch(actions.fetchingSuccess());
                dispatch(planActions.closeDetailDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_BLOCK_OF_WORK_PROGRAMS}));
                return done();
            });
    }
});


const createModule = createLogic({
    type: planActions.createModule.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const moduleWithBlocks = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_MODULE}));

        service.createModule(moduleWithBlocks)
            .then((res) => {
                const planId = getEducationalPlanDetailId(getState());
                dispatch(planActions.getEducationalDetail(planId));
                dispatch(actions.fetchingSuccess());
                dispatch(planActions.closeModuleDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_MODULE}));
                return done();
            });
    }
});

const changeModule = createLogic({
    type: planActions.changeModule.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const moduleWithBlocks = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CHANGE_MODULE}));

        service.changeModule(moduleWithBlocks)
            .then((res) => {
                const planId = getEducationalPlanDetailId(getState());
                dispatch(planActions.getEducationalDetail(planId));
                dispatch(actions.fetchingSuccess());
                dispatch(planActions.closeModuleDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CHANGE_MODULE}));
                return done();
            });
    }
});

const deleteModule = createLogic({
    type: planActions.deleteModule.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const moduleId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_MODULE}));

        service.deleteModule(moduleId)
            .then((res) => {
                const planId = getEducationalPlanDetailId(getState());
                dispatch(planActions.getEducationalDetail(planId));
                dispatch(actions.fetchingSuccess());
                dispatch(planActions.closeModuleDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_MODULE}));
                return done();
            });
    }
});

const getDirectionsDependedOnWorkProgram = createLogic({
    type: planActions.getDirectionsDependedOnWorkProgram.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const moduleId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_DIRECTIONS_DEPENDED_ON_WORK_PROGRAM}));

        service.getDirectionsDependedOnWorkProgram(moduleId)
            .then((res) => {
                dispatch(planActions.setDirectionsDependedOnWorkProgram(res.data));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_DIRECTIONS_DEPENDED_ON_WORK_PROGRAM}));
                return done();
            });
    }
});

export default [
    deleteModule,
    changeModule,
    createModule,
    getEducationalPlans,
    deleteEducationalPlan,
    createNewEducationalPlan,
    changeEducationalPlan,
    getEducationalPlanDetail,
    createBlockOfWorkPrograms,
    changeBlockOfWorkPrograms,
    deleteBlockOfWorkPrograms,
    getDirectionsDependedOnWorkProgram,
];
