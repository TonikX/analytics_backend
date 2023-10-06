import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import literatureActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode} from "./getters";
import {literatureSource} from "../WorkProgram/constants";
import {getWorkProgramField} from "../WorkProgram/getters";
import {WorkProgramGeneralFields} from "../WorkProgram/enum";

const service = new Service();

const getLiterature = createLogic({
    type: literatureActions.getLiterature.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const source = action?.payload?.source

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);

        const finalSearchQuery = searchQuery.length ? searchQuery : getWorkProgramField(state, WorkProgramGeneralFields.TITLE)

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_LITERATURE}));

        const request = source === literatureSource.EBSCO ? service.getEbscoLiterature(finalSearchQuery) : service.getLiterature(currentPage, searchQuery, sortingField, sortingMode)

        request.then((res) => {
                const courses = source === literatureSource.EBSCO ?  get(res, 'data.sources', []) : get(res, 'data.results', []);
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
