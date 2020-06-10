import {createLogic} from "redux-logic";

import actions from '../../../layout/actions';
import workProgramActions from '../actions';

import Service from '../service';
import {getWorkProgramId} from '../getters';

import {fetchingTypes} from "../enum";

const service = new Service();

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


const changeSectionNumber = createLogic({
    type: workProgramActions.changeSectionNumber.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const workProgramId = getWorkProgramId(state);
        const {newNumber, sectionId} = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CHANGE_SECTION_NUMBER}));

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
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CHANGE_SECTION_NUMBER}));
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
    saveSection,
    deleteSection,
    changeSectionNumber,
];
