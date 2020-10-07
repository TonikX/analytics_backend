import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import subjectAreaActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode, getFilteredRole} from "./getters";

const service = new Service();

const getProfessionsList = createLogic({
    type: subjectAreaActions.getProfessionsList.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);
        const role = getFilteredRole(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_PROFESSIONS}));

        service.getProfessions(currentPage, searchQuery, sortingField, sortingMode, role)
            .then((res) => {
                const courses = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(subjectAreaActions.setProfessionsList(courses));
                dispatch(subjectAreaActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_PROFESSIONS}));
                return done();
            });
    }
});

const deleteProfession = createLogic({
    type: subjectAreaActions.deleteProfession.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const professionId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_PROFESSIONS}));

        service.deleteProfession(professionId)
            .then((res) => {
                dispatch(subjectAreaActions.getProfessionsList());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_PROFESSIONS}));
                return done();
            });
    }
});

const createNewProfession = createLogic({
    type: subjectAreaActions.createNewProfession.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const profession = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_PROFESSIONS}));

        service.createProfession(profession)
            .then((res) => {
                dispatch(subjectAreaActions.getProfessionsList());
                dispatch(actions.fetchingSuccess());
                dispatch(subjectAreaActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_PROFESSIONS}));
                return done();
            });
    }
});

const changeProfession = createLogic({
    type: subjectAreaActions.changeProfession.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const profession = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_PROFESSIONS}));

        service.updateProfession(profession)
            .then((res) => {
                dispatch(subjectAreaActions.getProfessionsList());
                dispatch(actions.fetchingSuccess());
                dispatch(subjectAreaActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_PROFESSIONS}));
                return done();
            });
    }
});

export default [
    getProfessionsList,
    deleteProfession,
    createNewProfession,
    changeProfession,
];
