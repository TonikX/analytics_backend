import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import EducationalStandardsActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode} from "./getters";

const service = new Service();

const getEducationalStandards = createLogic({
    type: EducationalStandardsActions.getEducationalStandards.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_EDUCATIONAL_STANDARDS}));

        service.getEducationalStandards(currentPage, searchQuery, sortingField, sortingMode)
            .then((res) => {
                const data = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));
                //@ts-ignore
                dispatch(EducationalStandardsActions.setEducationalStandards(data));
                //@ts-ignore
                dispatch(EducationalStandardsActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_EDUCATIONAL_STANDARDS}));
                return done();
            });
    }
});

const deleteEducationalStandards = createLogic({
    type: EducationalStandardsActions.deleteEducationalStandard.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const educationalStandardId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_EDUCATIONAL_STANDARD}));

        service.deleteEducationalStandard(educationalStandardId)
            .then((res) => {
                dispatch(EducationalStandardsActions.getEducationalStandards());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_EDUCATIONAL_STANDARD}));
                return done();
            });
    }
});

const createEducationalStandards = createLogic({
    type: EducationalStandardsActions.createNewEducationalStandard.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const educationalStandard = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_EDUCATIONAL_STANDARD}));

        service.createEducationalStandard(educationalStandard)
            .then((res) => {
                dispatch(EducationalStandardsActions.getEducationalStandards());
                dispatch(actions.fetchingSuccess());
                dispatch(EducationalStandardsActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_EDUCATIONAL_STANDARD}));
                return done();
            });
    }
});

const changeEducationalStandards = createLogic({
    type: EducationalStandardsActions.changeEducationalStandard.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const educationalStandard = action.payload;
        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_EDUCATIONAL_STANDARD}));

        service.changeEducationalStandard(educationalStandard)
            .then((res) => {
                dispatch(EducationalStandardsActions.getEducationalStandards());
                dispatch(actions.fetchingSuccess());
                dispatch(EducationalStandardsActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_EDUCATIONAL_STANDARD}));
                return done();
            });
    }
});


export default [
    getEducationalStandards,
    deleteEducationalStandards,
    createEducationalStandards,
    changeEducationalStandards,
];
