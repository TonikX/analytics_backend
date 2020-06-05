import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import subjectAreaActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode} from "./getters";

const service = new Service();

const getSubjectArea = createLogic({
    type: subjectAreaActions.getSubjectArea.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_SUBJECT_AREA}));

        service.getSubjectArea(currentPage, searchQuery, sortingField, sortingMode)
            .then((res) => {
                const courses = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(subjectAreaActions.setSubjectArea(courses));
                dispatch(subjectAreaActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_SUBJECT_AREA}));
                return done();
            });
    }
});

const deleteSubjectArea = createLogic({
    type: subjectAreaActions.deleteSubjectArea.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const courseId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_SUBJECT_AREA}));

        service.deleteSubjectArea(courseId)
            .then((res) => {
                dispatch(subjectAreaActions.getSubjectArea());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_SUBJECT_AREA}));
                return done();
            });
    }
});

const createSubjectArea = createLogic({
    type: subjectAreaActions.createNewSubjectArea.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_SUBJECT_AREA}));

        service.createSubjectArea(course)
            .then((res) => {
                dispatch(subjectAreaActions.getSubjectArea());
                dispatch(actions.fetchingSuccess());
                dispatch(subjectAreaActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_SUBJECT_AREA}));
                return done();
            });
    }
});

const updateSubjectArea = createLogic({
    type: subjectAreaActions.changeSubjectArea.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_SUBJECT_AREA}));

        service.updateSubjectArea(course)
            .then((res) => {
                dispatch(subjectAreaActions.getSubjectArea());
                dispatch(actions.fetchingSuccess());
                dispatch(subjectAreaActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_SUBJECT_AREA}));
                return done();
            });
    }
});

export default [
    getSubjectArea,
    deleteSubjectArea,
    createSubjectArea,
    updateSubjectArea,
];
