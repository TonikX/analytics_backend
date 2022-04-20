import {createLogic} from "redux-logic";
import PracticeListActions from "./actions";
import get from "lodash/get";
import PracticeService from "../service";

const service = new PracticeService();

const getWorkProgramList = createLogic({
    type: PracticeListActions.getPracticeList.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        service.getPracticeList()
            .then((res) => {
                const results = get(res, 'data.results', []);
                dispatch(PracticeListActions.setPracticeList(results));
            })
            .finally(() => {
                return done();
            });
    }
});

const createPractice = createLogic({
    type: PracticeListActions.createPractice.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const state = action.payload;

        service.createPractice(state)
            .then(() => {
                // new program added
                dispatch(PracticeListActions.getPracticeList());
                dispatch(PracticeListActions.closeModal());
            })
            .catch(() => {
                dispatch(PracticeListActions.closeModal());
            })
            .finally(() => {
                return done();
            })
    }
});

export default [getWorkProgramList, createPractice];