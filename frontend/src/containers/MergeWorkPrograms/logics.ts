import {createLogic} from "redux-logic";
import get from "lodash/get";
import workProgramActions from "./actions";
import actions from "../../layout/actions";
import Service from "./service";
import {fetchingTypes} from "./enum";
import {getSearchQuery} from "./getters";

const service = new Service();

const getWorkProgramList = createLogic({
    type: workProgramActions.getWorkProgramsList.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const searchQuery = getSearchQuery(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_WORK_PROGRAM_LIST}));

        service.getWorkPrograms(searchQuery)
            .then((res) => {
                const courses = get(res, 'data.results', []);
                dispatch(workProgramActions.setWorkProgramsList(courses));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_WORK_PROGRAM_LIST}));
                return done();
            });
    }
});

const mergeWorkProgram = createLogic({
    type: workProgramActions.mergeWorkPrograms.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const {sourceId, targetId} = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.MERGE_WORK_PROGRAM}));

        service.mergeContent(sourceId, targetId)
            .then(() => {
                dispatch(actions.fetchingSuccess(['Копирование успешно']));
            })
            .catch(() => {
                dispatch(actions.fetchingFailed(['Не удалось скопировать РПД']));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.MERGE_WORK_PROGRAM}));
                return done();
            });
    }
});

export default [
    getWorkProgramList,
    mergeWorkProgram,
];