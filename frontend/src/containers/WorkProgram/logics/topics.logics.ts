import {createLogic} from "redux-logic";

import actions from '../../../layout/actions';
import workProgramActions from '../actions';

import Service from '../service';
import {getWorkProgramId} from '../getters';

import {fetchingTypes} from "../enum";

const service = new Service();

const saveTopic = createLogic({
    type: workProgramActions.saveTopic.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);
        const topic = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.SAVE_TOPIC}));
        debugger
        let promise;

        if (topic.id) {
            promise = service.saveTopic(topic);
        } else {
            promise = service.createNewTopic(topic, workProgramId);
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
        const {newNumber, sectionId} = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CHANGE_TOPIC_NUMBER}));

        service.changeSectionNumber(newNumber, sectionId)
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
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_TOPIC}));
                return done();
            });
    }
});

export default [
    saveTopic,
    deleteTopic,
    changeTopicNumber,
];
