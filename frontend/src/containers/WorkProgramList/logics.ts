import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import workProgramActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getFilters, getSearchQuery, getSortingField, getSortingMode} from "./getters";

const service = new Service();

const getWorkProgramList = createLogic({
    type: workProgramActions.getWorkProgramList.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);
        const filters = getFilters(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_WORK_PROGRAM_LIST}));

        // @ts-ignore
        service.getWorkPrograms(currentPage, searchQuery, sortingField, sortingMode, filters)
            .then((res) => {
                const courses = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(workProgramActions.setWorkProgramList(courses));
                dispatch(workProgramActions.changeAllCount(allPages));
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

const deleteWorkProgram = createLogic({
    type: workProgramActions.deleteWorkProgram.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const courseId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_WORK_PROGRAM}));

        service.deleteWorkProgram(courseId)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgramList());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_WORK_PROGRAM}));
                return done();
            });
    }
});

const createNewWorkProgram = createLogic({
    type: workProgramActions.createNewWorkProgram.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_WORK_PROGRAM}));

        service.createWorkProgram(course)
            .then((res) => {
                // @ts-ignore
                dispatch(workProgramActions.setWorkProgramIdForRedirect(res?.data?.id));
                dispatch(workProgramActions.getWorkProgramList());
                dispatch(actions.fetchingSuccess());
                dispatch(workProgramActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_WORK_PROGRAM}));
                return done();
            });
    }
});

export default [
    getWorkProgramList,
    deleteWorkProgram,
    createNewWorkProgram,
];
