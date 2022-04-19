import Service from "./service";
import {createLogic} from "redux-logic";
import PracticeListActions from "./actions";
import get from "lodash/get";

const service = new Service();

const getWorkProgramList = createLogic({
    type: PracticeListActions.getPracticeList.type,
    latest: true,

    process({getState, action}: any, dispatch) {
        service.getPracticeList()
            .then((res) => {
                const results = get(res, 'data.results', []);
                dispatch(PracticeListActions.setPracticeList(results));
            });
    }
});

export default [getWorkProgramList];