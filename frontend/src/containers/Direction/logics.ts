import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import competencesActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode} from "./getters";

const service = new Service();

const getEducationalProgram = createLogic({
    type: competencesActions.getDirections.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_EDUCATIONAL_PROGRAM}));

        service.getEducationalProgram(currentPage, searchQuery, sortingField, sortingMode)
            .then((res) => {
                const courses = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(competencesActions.setDirections(courses));
                dispatch(competencesActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_EDUCATIONAL_PROGRAM}));
                return done();
            });
    }
});

const deleteEducationalProgram = createLogic({
    type: competencesActions.deleteDirection.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const courseId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_EDUCATIONAL_PROGRAM}));

        service.deleteEducationalProgram(courseId)
            .then((res) => {
                dispatch(competencesActions.getDirections());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_EDUCATIONAL_PROGRAM}));
                return done();
            });
    }
});

const createNewEducationalProgram = createLogic({
    type: competencesActions.createNewDirection.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_EDUCATIONAL_PROGRAM}));

        service.createEducationalProgram(course)
            .then((res) => {
                dispatch(competencesActions.getDirections());
                dispatch(actions.fetchingSuccess());
                dispatch(competencesActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_EDUCATIONAL_PROGRAM}));
                return done();
            });
    }
});

const changeEducationalProgram = createLogic({
    type: competencesActions.changeDirection.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_EDUCATIONAL_PROGRAM}));

        service.updateEducationalProgram(course)
            .then((res) => {
                dispatch(competencesActions.getDirections());
                dispatch(actions.fetchingSuccess());
                dispatch(competencesActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_EDUCATIONAL_PROGRAM}));
                return done();
            });
    }
});

export default [
    getEducationalProgram,
    deleteEducationalProgram,
    createNewEducationalProgram,
    changeEducationalProgram,
];
