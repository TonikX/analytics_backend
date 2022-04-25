import {createLogic} from "redux-logic";
import PracticeActions from "./actions";
import PracticeService from "./service";

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


export default [getPractice, savePractice];