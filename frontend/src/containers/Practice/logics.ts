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


export default [getPractice];