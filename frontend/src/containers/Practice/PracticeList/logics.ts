import {createLogic} from "redux-logic";
import PracticeListActions from "./actions";
import get from "lodash/get";
import PracticeService from "../service";
import {getCurrentPage, getSearchText, getSortingField} from "./getters";

const service = new PracticeService();

const getPracticeList = createLogic({
    type: PracticeListActions.getPracticeList.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const searchText = getSearchText(state);
        const sortingField = getSortingField(state);
        const currentPage = getCurrentPage(state);

        service.getPracticeList(searchText, sortingField, currentPage)
            .then((res) => {
                const results = get(res, 'data.results', []);
                const count = get(res, 'data.count', 0);
                dispatch(PracticeListActions.setPracticeList(results));
                dispatch(PracticeListActions.setPracticeCount(count));
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

export default [getPracticeList, createPractice];