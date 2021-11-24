import {createLogic} from "redux-logic";
import dodProfileActions from "./actions";
import Service from './service';
import get from "lodash/get";
import {getCurrentPage, getTableMode} from "./getters";
import actions from "../../layout/actions";

const service = new Service();

const getDodProfile = createLogic({
    type: dodProfileActions.getDodWorkProgramsList.type,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const currentPage = getCurrentPage(state)
        const tableMode = getTableMode(state)

        dispatch(actions.fetchingTrue({destination: "getDodWorkProgramsList"}));

        service.getDodProfile(currentPage, tableMode)
            .then((res) => {
                console.log(res)
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

const getCurrentUserName = createLogic({
    type: dodProfileActions.getUserName.type,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: "getUserName"}));

        service.getCurrentUserName()
            .then((res) => {
                const userName = get(res, 'data', {});
                dispatch(dodProfileActions.setUserName(userName))
                dispatch(actions.fetchingSuccess());
                dispatch(actions.fetchingFalse({destination: "getUserName"}));
                return done();
            })
    }
});

const getCurrentUserGroups = createLogic({
    type: dodProfileActions.getUserGroups.type,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: "getUserGroups"}));

        service.getCurrentUserGroups()
            .then((res) => {
                 const userGroups = get(res, 'data.groups', []);
                dispatch(dodProfileActions.setUserGroups(userGroups))
                dispatch(actions.fetchingSuccess());
                dispatch(actions.fetchingFalse({destination: "getUserGroups"}));
                return done();
            })
    }
});

export default [
    getDodProfile,
    getCurrentUserName,
    getCurrentUserGroups
];