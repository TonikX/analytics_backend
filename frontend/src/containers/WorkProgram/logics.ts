import {createLogic} from "redux-logic";

import actions from '../../layout/actions';
import workProgramActions from './actions';

import Service from './service';
import {getWorkProgramId} from './getters';

import {fetchingTypes} from "./enum";

import sectionLogics from './logics/sections.logics';
import topicLogics from './logics/topics.logics';
import literatureLogics from './logics/literature.logics';
import prerequisitesLogics from './logics/prerequisites.logics';
import evaluationToolsLogics from './logics/evaluationTools.logics';
import resultsLogics from './logics/results.logics';

const service = new Service();

const getWorkProgram = createLogic({
    type: workProgramActions.getWorkProgram.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const programId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_WORK_PROGRAM}));

        service.getWorkProgram(programId)
            .then((res) => {
                dispatch(workProgramActions.setWorkProgram(res.data));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_WORK_PROGRAM}));
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

export default [
    ...sectionLogics,
    ...topicLogics,
    ...literatureLogics,
    ...prerequisitesLogics,
    ...evaluationToolsLogics,
    ...resultsLogics,
    getWorkProgram,
    saveWorkProgram,
    getWorkProgramEvaluationTools,
];
