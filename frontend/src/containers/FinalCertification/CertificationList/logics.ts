import {createLogic} from "redux-logic";
import CertificationListActions from "./actions";
import get from "lodash/get";
import {getCurrentPage, getSearchText, getSortingField} from "./getters";
import CertificationService from "../service";
import actions from "../../../layout/actions";
import {fetchingTypes} from "../enum";

const service = new CertificationService();

const getCertificationList = createLogic({
    type: CertificationListActions.getCertificationList.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const searchText = getSearchText(state);
        const sortingField = getSortingField(state);
        const currentPage = getCurrentPage(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_CERTIFICATION_LIST}));
        service.getCertificationList(searchText, sortingField, currentPage)
            .then((res) => {
                const results = get(res, 'data.results', []);
                const count = get(res, 'data.count', 0);
                dispatch(CertificationListActions.setCertificationList(results));
                dispatch(CertificationListActions.setCertificationCount(count));
            })
            .finally(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_CERTIFICATION_LIST}));
                return done();
            });
    }
});

export default [getCertificationList];