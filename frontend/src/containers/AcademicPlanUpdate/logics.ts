import {createLogic} from "redux-logic";

import actions from '../../layout/actions';
import planActions from './actions';
import get from 'lodash/get';
import Service from './service';

import {fetchingTypes, SchedulerConfigurationFields} from "./enum";
import {
    getLogsCurrentPage,
    getLogsSearchQuery,
    getLogsSortingField,
    getLogsSortingMode,
    getUpdatedPlansCurrentPage,
    getUpdatedPlansSearchQuery,
    getUpdatedPlansSortingField,
    getUpdatedPlansSortingMode
} from "./getters";

const service = new Service();

const getAcademicPlanUpdateLogs = createLogic({
    type: planActions.getAcademicPlanUpdateLogs.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getLogsCurrentPage(state);
        const searchQuery = getLogsSearchQuery(state);
        const sortingField = getLogsSortingField(state);
        const sortingMode = getLogsSortingMode(state) as any;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_ACADEMIC_PLAN_UPDATE_LOGS}));

        service.getAcademicPlanUpdateLogs(currentPage, searchQuery, sortingField, sortingMode)
            .then((res) => {
                const academicPlansUpdateLogs = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(planActions.setAcademicPlanUpdateLogs(academicPlansUpdateLogs));
                dispatch(planActions.logsChangeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_ACADEMIC_PLAN_UPDATE_LOGS}));
                return done();
            });
    }
});

const getSchedulerConfiguration = createLogic({
    type: planActions.getSchedulerConfiguration.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_SCHEDULER_CONFIGURATION}));

        service.getSchedulerConfiguration()
            .then((res) => {
                const schedulerConfiguration = {
                    [SchedulerConfigurationFields.DAYS_INTERVAL]: get(res, `data.${[SchedulerConfigurationFields.DAYS_INTERVAL]}`, null),
                    [SchedulerConfigurationFields.EXECUTION_HOURS]: get(res, `data.${[SchedulerConfigurationFields.EXECUTION_HOURS]}`, null)
                };
                dispatch(planActions.setSchedulerConfiguration(schedulerConfiguration));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_SCHEDULER_CONFIGURATION}));
                return done();
            });
    }
});

const updateAcademicPlans = createLogic({
    type: planActions.updateAcademicPlans.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_ACADEMIC_PLANS}));

        service.updateAcademicPlans()
            .then((res) => {
                dispatch(planActions.getAcademicPlanUpdateLogs())
                dispatch(planActions.getUpdatedAcademicPlans())
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_ACADEMIC_PLANS}));
                return done();
            });
    }
});

const updateAcademicPlansFrom2023 = createLogic({
    type: planActions.updateAcademicPlansFrom2023.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_ACADEMIC_PLANS_FROM_2023}));

        service.updateAcademicPlansFrom2023()
            .then((res) => {
                dispatch(planActions.getAcademicPlanUpdateLogs())
                dispatch(planActions.getUpdatedAcademicPlans())
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_ACADEMIC_PLANS_FROM_2023}));
                return done();
            });
    }
});


const getAcademicPlansExcel = createLogic({
    type: planActions.getAcademicPlansExcel.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const state = getState();

        service.getAcademicPlansExcel()
            .then((res) => {
                console.log(res)
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_ACADEMIC_PLAN_UPDATE_LOGS}));
                return done();
            });
    }
});


const getUpdatedAcademicPlans = createLogic({
    type: planActions.getUpdatedAcademicPlans.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getUpdatedPlansCurrentPage(state);
        const searchQuery = getUpdatedPlansSearchQuery(state);
        const sortingField = getUpdatedPlansSortingField(state);
        const sortingMode = getUpdatedPlansSortingMode(state) as any;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_UPDATED_ACADEMIC_PLANS}));

        service.getUpdatedAcademicPlans(currentPage, searchQuery, sortingField, sortingMode)
            .then((res) => {
                const updatedAcademicPlans = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(planActions.setUpdatedAcademicPlans(updatedAcademicPlans));
                dispatch(planActions.updatedPlansChangeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_UPDATED_ACADEMIC_PLANS}));
                return done();
            });
    }
});


const createNewAcademicPlanUpdateConfiguration = createLogic({
    type: planActions.createNewAcademicPlanUpdateConfiguration.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const academicPlanConfiguration = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_ACADEMIC_PLAN_UPDATE_CONFIGURATION}));

        service.createAcademicPlanUpdateConfiguration(academicPlanConfiguration)
            .then((res) => {
                dispatch(planActions.getUpdatedAcademicPlans());
                dispatch(actions.fetchingSuccess());
                dispatch(planActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_ACADEMIC_PLAN_UPDATE_CONFIGURATION}));
                return done();
            });
    }
});

const updateAcademicPlanConfiguration = createLogic({
    type: planActions.updateAcademicPlanConfiguration.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const academicPlanConfiguration = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_ACADEMIC_PLAN_UPDATE_CONFIGURATION}));

        service.updateAcademicPlanConfiguration(academicPlanConfiguration)
            .then((res) => {
                dispatch(planActions.getUpdatedAcademicPlans());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_ACADEMIC_PLAN_UPDATE_CONFIGURATION}));
                return done();
            });
    }
});

const updateAcademicPlanOver23 = createLogic({
    type: planActions.updateAcademicPlanOver23.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const academicPlanConfiguration = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_ACADEMIC_PLAN_UPDATE_OVER_23}));

        service.updateAcademicPlanOver23(academicPlanConfiguration)
          .then((res) => {
              dispatch(planActions.getUpdatedAcademicPlans());
              dispatch(actions.fetchingSuccess());
          })
          .catch((err) => {
              dispatch(actions.fetchingFailed(err));
          })
          .then(() => {
              dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_ACADEMIC_PLAN_UPDATE_OVER_23}));
              return done();
          });
    }
});

const updateSchedulerConfiguration = createLogic({
    type: planActions.updateSchedulerConfiguration.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const schedulerConfiguration = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_SCHEDULER_CONFIGURATION}));

        service.updateSchedulerConfiguration(schedulerConfiguration)
            .then((res) => {
                dispatch(planActions.getSchedulerConfiguration());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_SCHEDULER_CONFIGURATION}));
                return done();
            });
    }
});


export default [
    getAcademicPlanUpdateLogs,
    updateAcademicPlansFrom2023,
    updateAcademicPlans,
    getAcademicPlansExcel,
    getUpdatedAcademicPlans,
    createNewAcademicPlanUpdateConfiguration,
    updateAcademicPlanConfiguration,
    getSchedulerConfiguration,
    updateAcademicPlanOver23,
    updateSchedulerConfiguration
];
