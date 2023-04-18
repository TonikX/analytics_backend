import {createLogic} from "redux-logic";

import actions from '../../../layout/actions';
import workProgramActions from '../actions';

import Service from '../service';
import {getWorkProgramId} from '../getters';

import {fetchingTypes, fields, workProgramTopicFields} from "../enum";

const service = new Service();

const saveTopic = createLogic({
    type: workProgramActions.saveTopic.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);
        const topic = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.SAVE_TOPIC}));

        let promise;

        if (topic[workProgramTopicFields.ID]) {
            promise = service.saveTopic(topic);
        } else {
            promise = service.createNewTopic(topic, workProgramId);
        }

        promise
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram(workProgramId));
                // @ts-ignore
                dispatch(actions.fetchingSuccess());
                dispatch(workProgramActions.closeDialog(fields.CREATE_NEW_TOPIC_DIALOG));
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.SAVE_TOPIC}));
                return done();
            });
    }
});


const changeTopicNumber = createLogic({
    type: workProgramActions.changeTopicNumber.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);
        const {newNumber, topicId} = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CHANGE_TOPIC_NUMBER}));

        service.changeTopicNumber(newNumber, topicId)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram(workProgramId));
                // @ts-ignore
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CHANGE_TOPIC_NUMBER}));
                return done();
            });
    }
});

const deleteTopic = createLogic({
    type: workProgramActions.deleteTopic.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);
        const id = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_TOPIC}));

        service.deleteTopic(id)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram(workProgramId));
                // @ts-ignore
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_TOPIC}));
                return done();
            });
    }
});

const addTopicMaterial = createLogic({
    type: workProgramActions.addTopicMaterial.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);
        const topic = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.ADD_TOPIC_MATERIAL}));

        service.addTopicMaterial(topic)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram(workProgramId));
                dispatch(actions.fetchingSuccess());
                dispatch(workProgramActions.closeDialog(fields.ADD_NEW_MATERIAL_TO_TOPIC));
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.ADD_TOPIC_MATERIAL}));
                return done();
            });
    }
});

const updateTopicMaterial = createLogic({
    type: workProgramActions.updateTopicMaterial.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_TOPIC_MATERIAL}));

        service.updateTopicMaterial(action.payload)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram(workProgramId));
                dispatch(actions.fetchingSuccess());
                dispatch(workProgramActions.closeDialog(fields.ADD_NEW_MATERIAL_TO_TOPIC));
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_TOPIC_MATERIAL}));
                return done();
            });
    }
});

const deleteTopicMaterial = createLogic({
    type: workProgramActions.deleteTopicMaterial.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);
        const id = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_TOPIC_MATERIAL}));

        service.deleteTopicMaterial(id)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram(workProgramId));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_TOPIC_MATERIAL}));
                return done();
            });
    }
});

export default [
    saveTopic,
    deleteTopic,
    changeTopicNumber,
    addTopicMaterial,
    updateTopicMaterial,
    deleteTopicMaterial,
];
