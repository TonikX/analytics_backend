import {createLogic} from "redux-logic";
import userProfileActions from "./actions";
import Service from './service';
import get from "lodash/get";
import {getCurrentPage} from "./getters";
import actions from "../../layout/actions";

const service = new Service();

const getUserWorkPrograms = createLogic({
    type: userProfileActions.getUserWorkProgramsList.type,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const currentPage = getCurrentPage(state)

        dispatch(actions.fetchingTrue({destination: "getUserWorkProgramsList"}));

        service.getUserWorkPrograms(currentPage)
            .then((res) => {
                const workProgramList = get(res, 'data.results', []);
                const allCount = Math.ceil(get(res, 'data.count', 0));
                dispatch(userProfileActions.setUserWorkProgramsList(workProgramList))
                dispatch(userProfileActions.changeAllCount(allCount));
                dispatch(actions.fetchingSuccess());
                dispatch(actions.fetchingFalse({destination: "getUserWorkProgramsList"}));
                return done();
            })
    }
});
export default [
    getUserWorkPrograms,
];
