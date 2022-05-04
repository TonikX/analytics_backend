import {createLogic} from "redux-logic";
import CertificationListActions from "./actions";
import get from "lodash/get";
import {getCurrentPage, getSearchText, getSortingField, getSortingMode} from "./getters";
import CertificationService from "../service";

const service = new CertificationService();

const getCertificationList = createLogic({
    type: CertificationListActions.getCertificationList.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const searchText = getSearchText(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);
        const currentPage = getCurrentPage(state);

        service.getCertificationList(searchText, sortingField, currentPage)
            .then((res) => {
                const results = get(res, 'data.results', []);
                const count = get(res, 'data.count', 0);
                dispatch(CertificationListActions.setCertificationList(results));
                dispatch(CertificationListActions.setCertificationCount(count));
            })
            .finally(() => {
                return done();
            });
    }
});

export default [getCertificationList];