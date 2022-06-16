import {createLogic} from "redux-logic";
import PracticeListActions from "./actions";
import get from "lodash/get";
import PracticeService from "../service";
import {getCurrentPage, getSearchText, getSortingField} from "./getters";
import actions from "../../../layout/actions";
import {fetchingTypes} from "../enum";

const service = new PracticeService();

const getPracticeList = createLogic({
    type: PracticeListActions.getPracticeList.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const searchText = getSearchText(state);
        const sortingField = getSortingField(state);
        const currentPage = getCurrentPage(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_PRACTICE_LIST}));
        service.getPracticeList(searchText, sortingField, currentPage)
            .then((res) => {
                const results = get(res, 'data.results', []);
                const count = get(res, 'data.count', 0);
                dispatch(PracticeListActions.setPracticeList(results));
                dispatch(PracticeListActions.setPracticeCount(count));
            })
            .finally(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_PRACTICE_LIST}));
                return done();
            });
    }
});

const createPractice = createLogic({
    type: PracticeListActions.createPractice.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const {state, callback} = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_PRACTICE}));
        service.createPractice(state)
            .then((res: any) => {
                // new program added
                callback(res.data.id);
            })
            .catch(() => {
                console.error('could not create practice')
                dispatch(actions.fetchingFailed([`Ошибка при создании программы, попробуйте перезагрузить страницу или попробовать позже`]));
                dispatch(PracticeListActions.closeModal());
            })
            .finally(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_PRACTICE}));
                return done();
            })
    }
});

export default [getPracticeList, createPractice];