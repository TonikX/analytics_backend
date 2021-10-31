import {createLogic} from "redux-logic";
import dodProfileActions from "./actions";
import Service from './service';
import get from "lodash/get";
import {getCurrentPage} from "./getters";
import actions from "../../layout/actions";

const service = new Service();

const getDodProfile = createLogic({
    type: dodProfileActions.getDodWorkProgramsList.type,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const currentPage = getCurrentPage(state)

        dispatch(actions.fetchingTrue({destination: "getDodWorkProgramsList"}));

            service.getDodProfile(currentPage)
            .then((res) => {
                const workProgramList = get(res, 'data.results', []);
                const allCount = Math.ceil(get(res, 'data.count', 0));
                dispatch(dodProfileActions.setDodWorkProgramsList(workProgramList))
                dispatch(dodProfileActions.changeAllCount(allCount));
                dispatch(actions.fetchingSuccess());
                dispatch(actions.fetchingFalse({destination: "getDodWorkProgramsList"}));
                return done();
            })
    }
});

export default [
    getDodProfile
];