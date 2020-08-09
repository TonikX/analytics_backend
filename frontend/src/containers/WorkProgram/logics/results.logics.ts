import {createLogic} from "redux-logic";

import actions from '../../../layout/actions';
import workProgramActions from '../actions';

import Service from '../service';
import {getWorkProgramId} from '../getters';

import {fetchingTypes, fields} from "../enum";

const service = new Service();

const addResult = createLogic({
    type: workProgramActions.addResult.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);
        const result = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.ADD_RESULT}));

        service.addResult(result, workProgramId)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram(workProgramId));
                // @ts-ignore
                dispatch(actions.fetchingSuccess());
                dispatch(workProgramActions.closeDialog(fields.ADD_NEW_RESULT));
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.ADD_RESULT}));
                return done();
            });
    }
});

const changeResult = createLogic({
    type: workProgramActions.changeResult.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);
        const result = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CHANGE_RESULT}));

        service.changeResult(result)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram(workProgramId));
                // @ts-ignore
                dispatch(actions.fetchingSuccess());
                dispatch(workProgramActions.closeDialog(fields.ADD_NEW_RESULT));
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CHANGE_RESULT}));
                return done();
            });
    }
});


const deleteResult = createLogic({
    type: workProgramActions.deleteResult.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);
        const id = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_RESULT}));

        service.deleteResult(id)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram(workProgramId));
                // @ts-ignore
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_RESULT}));
                return done();
            });
    }
});

const getResults = createLogic({
    type: workProgramActions.getResults.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const workProgramId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_RESULTS}));

        service.getResults(workProgramId)
            .then((res) => {
                dispatch(workProgramActions.setResults(res.data));
                // @ts-ignore
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_RESULTS}));
                return done();
            });
    }
});

export default [
    addResult,
    changeResult,
    deleteResult,
    getResults,
];
