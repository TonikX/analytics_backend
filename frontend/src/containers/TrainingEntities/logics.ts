import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import subjectAreaActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode, getSubjectId} from "./getters";

const service = new Service();

const getTrainingEntities = createLogic({
    type: subjectAreaActions.getTrainingEntities.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);
        const subjectId = getSubjectId(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_TRAINING_ENTITIES}));

        service.getTrainingEntities(currentPage, searchQuery, sortingField, sortingMode, subjectId)
            .then((res) => {
                const courses = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(subjectAreaActions.setTrainingEntities(courses));
                dispatch(subjectAreaActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_TRAINING_ENTITIES}));
                return done();
            });
    }
});

const deleteTrainingEntities = createLogic({
    type: subjectAreaActions.deleteTrainingEntities.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const courseId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_TRAINING_ENTITIES}));

        service.deleteTrainingEntities(courseId)
            .then((res) => {
                dispatch(subjectAreaActions.getTrainingEntities());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_TRAINING_ENTITIES}));
                return done();
            });
    }
});

const createNewTrainingEntities = createLogic({
    type: subjectAreaActions.createNewTrainingEntities.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_TRAINING_ENTITIES}));

        service.createTrainingEntities(course)
            .then((res) => {
                dispatch(subjectAreaActions.getTrainingEntities());
                dispatch(actions.fetchingSuccess());
                dispatch(subjectAreaActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_TRAINING_ENTITIES}));
                return done();
            });
    }
});

const changeTrainingEntities = createLogic({
    type: subjectAreaActions.changeTrainingEntities.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_TRAINING_ENTITIES}));

        service.updateTrainingEntities(course)
            .then((res) => {
                dispatch(subjectAreaActions.getTrainingEntities());
                dispatch(actions.fetchingSuccess());
                dispatch(subjectAreaActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_TRAINING_ENTITIES}));
                return done();
            });
    }
});

export default [
    getTrainingEntities,
    deleteTrainingEntities,
    createNewTrainingEntities,
    changeTrainingEntities,
];
