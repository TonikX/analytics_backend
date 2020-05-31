import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import literatureActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode} from "./getters";

const service = new Service();

const getLiterature = createLogic({
    type: literatureActions.getLiterature.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_LITERATURE}));

        service.getLiterature(currentPage, searchQuery, sortingField, sortingMode)
            .then((res) => {
                const courses = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(literatureActions.setLiterature(courses));
                dispatch(literatureActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_LITERATURE}));
                return done();
            });
    }
});

const deleteLiterature = createLogic({
    type: literatureActions.deleteLiterature.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const courseId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_LITERATURE}));

        service.deleteLiterature(courseId)
            .then((res) => {
                dispatch(literatureActions.getLiterature());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_LITERATURE}));
                return done();
            });
    }
});

const createNewLiterature = createLogic({
    type: literatureActions.createNewLiterature.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_LITERATURE}));

        service.createLiterature(course)
            .then((res) => {
                dispatch(literatureActions.getLiterature());
                dispatch(actions.fetchingSuccess());
                dispatch(literatureActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_LITERATURE}));
                return done();
            });
    }
});

const updateLiterature = createLogic({
    type: literatureActions.changeLiterature.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_LITERATURE}));

        service.updateLiterature(course)
            .then((res) => {
                dispatch(literatureActions.getLiterature());
                dispatch(actions.fetchingSuccess());
                dispatch(literatureActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_LITERATURE}));
                return done();
            });
    }
});

export default [
    getLiterature,
    deleteLiterature,
    createNewLiterature,
    updateLiterature,
];
