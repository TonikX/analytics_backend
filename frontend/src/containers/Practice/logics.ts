import {createLogic} from "redux-logic";
import PracticeActions from "./actions";
import PracticeService from "./service";
import {getId} from "./getters";

const service = new PracticeService();

const getPractice = createLogic({
    type: PracticeActions.getPractice.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const id = action.payload;
        service.getPractice(id)
            .then((res) => {
                dispatch(PracticeActions.setPractice(res.data));
            })
            .finally(() => {
                return done();
            });
    }
});

const savePractice = createLogic({
    type: PracticeActions.savePractice.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const {id, practice} = action.payload;
        service.savePractice(practice, id)
            .then((res) => {
            })
            .finally(() => {
                return done();
            });
    }
});

const saveField = createLogic({
    type: PracticeActions.saveField.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const practiceId = getId(state);
        const {field, value} = action.payload;
        service.patchPractice({[field]: value}, practiceId)
            .then((res) => {
                dispatch(PracticeActions.setField({field, value}));
            })
            .catch((err) => {
                console.error(`could not save field: ${field}`);
                dispatch(PracticeActions.getPractice(practiceId));
            })
            .finally(() => {
                return done();
            });
    }
});


export default [getPractice, savePractice, saveField];