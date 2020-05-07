import {createLogic} from "redux-logic";
import get from "lodash/get";

import actions from '../../layout/actions';
import workProgramActions from './actions';

import Service from './service';
import {getWorkProgramId} from './getters';

import {fetchingTypes} from "./enum";

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
                dispatch(workProgramActions.setWorkProgram(res.data));
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

const saveSection = createLogic({
    type: workProgramActions.saveSection.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);
        const section = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.SAVE_SECTION}));

        let promise;

        if (section.id) {
            promise = service.saveSection(section);
        } else {
            promise = service.createNewSection(section, workProgramId);
        }

        promise
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram(workProgramId));
                // @ts-ignore
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.SAVE_SECTION}));
                return done();
            });
    }
});

const deleteSection = createLogic({
    type: workProgramActions.deleteSection.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);
        const id = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_SECTION}));

        service.deleteSection(id)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram(workProgramId));
                // @ts-ignore
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_SECTION}));
                return done();
            });
    }
});

export default [
    getWorkProgram,
    saveWorkProgram,
    saveSection,
    deleteSection,
];
