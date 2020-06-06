import {createLogic} from "redux-logic";

import actions from '../../../layout/actions';
import workProgramActions from '../actions';

import Service from '../service';
import {getWorkProgramId} from '../getters';

import {fetchingTypes, fields} from "../enum";

const service = new Service();

const addPrerequisite = createLogic({
    type: workProgramActions.addPrerequisite.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);
        const prerequisite = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.ADD_PREREQUISITES}));

        service.addPrerequisites(prerequisite, workProgramId)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram(workProgramId));
                // @ts-ignore
                dispatch(actions.fetchingSuccess());
                dispatch(workProgramActions.closeDialog(fields.ADD_NEW_PREREQUISITES));
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.ADD_PREREQUISITES}));
                return done();
            });
    }
});

const changePrerequisite = createLogic({
    type: workProgramActions.changePrerequisite.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);
        const prerequisite = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CHANGE_PREREQUISITES}));

        service.addPrerequisites(prerequisite, workProgramId)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram(workProgramId));
                // @ts-ignore
                dispatch(actions.fetchingSuccess());
                dispatch(workProgramActions.closeDialog(fields.ADD_NEW_PREREQUISITES));
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CHANGE_PREREQUISITES}));
                return done();
            });
    }
});


const deletePrerequisite = createLogic({
    type: workProgramActions.deletePrerequisite.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);
        const id = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_PREREQUISITES}));

        service.deletePrerequisite(id)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram(workProgramId));
                // @ts-ignore
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_PREREQUISITES}));
                return done();
            });
    }
});

export default [
    addPrerequisite,
    deletePrerequisite,
    changePrerequisite,
];
