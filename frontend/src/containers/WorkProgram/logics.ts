import {createLogic} from "redux-logic";

import get from 'lodash/get';

import actions from '../../layout/actions';
import workProgramActions from './actions';

import Service from './service';
import {
    getWorkProgramUserExpertiseId,
    getWorkProgramId,
    getWorkProgramCompetenceFiltersYear,
    getWorkProgramCompetenceFiltersAP,
    getWorkProgramCompetenceFiltersImp
} from './getters';

import {fetchingTypes} from "./enum";

import sectionLogics from './logics/sections.logics';
import topicLogics from './logics/topics.logics';
import literatureLogics from './logics/literature.logics';
import prerequisitesLogics from './logics/prerequisites.logics';
import evaluationToolsLogics from './logics/evaluationTools.logics';
import intermediateCertificationLogics from './logics/intermediateCertification.logics';
import resultsLogics from './logics/results.logics';
import commentsLogics from './logics/comments.logics';
import zunsLogics from './logics/zuns.logics';

import {appRouter} from "../../service/router-service";

const service = new Service();

const getWorkProgram = createLogic({
    type: workProgramActions.getWorkProgram.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        let id
        let quiteLoad = false
        let getEvaluationToolsList = true

        if (typeof action.payload === 'object') {
            id = action?.payload?.id ||  getWorkProgramId(state)
            quiteLoad = action?.payload?.quiteLoad
            getEvaluationToolsList = action?.payload?.getEvaluationToolsList

            if (getEvaluationToolsList === undefined) {
                getEvaluationToolsList = true
            }
        } else {
            id = action.payload || getWorkProgramId(state);
        }

        if (!quiteLoad) {
            dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_WORK_PROGRAM}));
        }

        service.getWorkProgram(id)
            .then((res) => {
                dispatch(workProgramActions.setWorkProgram(res.data));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_WORK_PROGRAM}));
                if (getEvaluationToolsList) {
                    dispatch(workProgramActions.getWorkProgramEvaluationTools());
                }
                return done();
            });
    }
});

const getWorkProgramEvaluationTools = createLogic({
    type: workProgramActions.getWorkProgramEvaluationTools.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_WORK_PROGRAM_EVALUATION_TOOLS}));

        service.getWorkProgramEvaluationTools(workProgramId)
            .then((res) => {
                dispatch(workProgramActions.setWorkProgramEvaluationTools(res.data));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_WORK_PROGRAM_EVALUATION_TOOLS}));
                return done();
            });
    }
});

const getApWithCompetencesAndIndicatorsToWp = createLogic({
    type: workProgramActions.getApWithCompetencesAndIndicatorsToWp.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);

        const filtersYear = getWorkProgramCompetenceFiltersYear(state)
        const filtersAp = getWorkProgramCompetenceFiltersAP(state)
        const filtersImp = getWorkProgramCompetenceFiltersImp(state)

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_AP_WITH_COMPETENCES_AND_INDICATORS_TO_WP}));

        service.getApWithCompetencesAndIndicatorsToWp(workProgramId, filtersYear, filtersAp, filtersImp)
            .then((res) => {
                dispatch(workProgramActions.setApWithCompetencesAndIndicatorsToWp(res.data));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_AP_WITH_COMPETENCES_AND_INDICATORS_TO_WP}));
                return done();
            });
    }
});

const getAllCompetencesAndIndicatorsForWp = createLogic({
    type: workProgramActions.getAllCompetencesAndIndicatorsForWp.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_ALL_COMPETENCES_AND_INDICATORS_FOR_WP}));

        service.getAllCompetencesAndIndicatorsForWp(workProgramId)
            .then((res) => {
                dispatch(workProgramActions.setAllCompetencesAndIndicatorsForWp(res.data.competences));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_ALL_COMPETENCES_AND_INDICATORS_FOR_WP}));
                return done();
            });
    }
});

const saveWorkProgram = createLogic({
    type: workProgramActions.saveWorkProgram.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const {destination, value} = action.payload;
        const workProgramId = getWorkProgramId(state);

        dispatch(actions.fetchingComponentTrue({destination: destination}));

        service.saveWorkProgram(destination, value, workProgramId)
            .then((res) => {
                // @ts-ignore
                dispatch(workProgramActions.setWorkProgramPart(res.data));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingComponentFalse({destination: destination}));
                return done();
            });
    }
});

const cloneWorkProgram = createLogic({
    type: workProgramActions.cloneWorkProgram.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const workProgramId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CLONE_WORK_PROGRAM}));

        service.cloneWorkProgram(workProgramId)
            .then((res) => {
                const newWorkProgramId = get(res, 'data.id');
                if (newWorkProgramId) {
                    window.location.href = appRouter.getWorkProgramLink(newWorkProgramId);
                }

                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CLONE_WORK_PROGRAM}));
                return done();
            });
    }
});

const sendToExpertise = createLogic({
    type: workProgramActions.sendWorkProgramToExpertise.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.SEND_TO_EXPERTISE}));

        service.sendToExpertise(workProgramId)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.SEND_TO_EXPERTISE}));
                return done();
            });
    }
});

const sendToIsu = createLogic({
    type: workProgramActions.sendWorkProgramToIsu.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.SEND_TO_ISU}));

        service.sendToIsu(workProgramId)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.SEND_TO_ISU}));
                return done();
            });
    }
});

const sendWorkProgramToArchive = createLogic({
    type: workProgramActions.sendWorkProgramToArchive.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.SEND_TO_ARCHIVE}));

        service.sendToArchive(workProgramId)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.SEND_TO_ARCHIVE}));
                return done();
            });
    }
});

const returnWorkProgramToWork = createLogic({
    type: workProgramActions.returnWorkProgramToWork.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const expertiseId = getWorkProgramUserExpertiseId(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.SEND_TO_WORK}));

        service.returnWorkProgramToWork(expertiseId)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.SEND_TO_WORK}));
                return done();
            });
    }
});

const approveWorkProgram = createLogic({
    type: workProgramActions.approveWorkProgram.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const expertiseId = getWorkProgramUserExpertiseId(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.APPROVE_WORK_PROGRAM}));

        service.approveWorkProgram(expertiseId)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.APPROVE_WORK_PROGRAM}));
                return done();
            });
    }
});

export default [
    ...sectionLogics,
    ...topicLogics,
    ...literatureLogics,
    ...prerequisitesLogics,
    ...evaluationToolsLogics,
    ...intermediateCertificationLogics,
    ...resultsLogics,
    ...commentsLogics,
    ...zunsLogics,
    getWorkProgram,
    saveWorkProgram,
    getWorkProgramEvaluationTools,
    getApWithCompetencesAndIndicatorsToWp,
    getAllCompetencesAndIndicatorsForWp,
    cloneWorkProgram,
    sendToExpertise,
    returnWorkProgramToWork,
    sendToIsu,
    approveWorkProgram,
    sendWorkProgramToArchive,
];
