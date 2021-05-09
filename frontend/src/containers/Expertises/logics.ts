import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import expertisesActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {
    getCurrentPage,
    getExpertiseId,
    getSearchQuery, getSelectedQualification,
    getSelectedStatus,
    getSortingField,
    getSortingMode
} from "./getters";

const service = new Service();

const getExpertisesList = createLogic({
    type: expertisesActions.getExpertisesList.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);
        const selectedStatus = getSelectedStatus(state);
        const selectedQualification = getSelectedQualification(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_EXPERTISES}));

        service.getExpertises(currentPage, searchQuery, sortingField, sortingMode, selectedStatus, selectedQualification)
            .then((res) => {
                const results = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(expertisesActions.setExpertisesList(results));
                dispatch(expertisesActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_EXPERTISES}));
                return done();
            });
    }
});


const getExpertise = createLogic({
    type: expertisesActions.getExpertise.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const id = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_EXPERTISE}));

        service.getExpertise(id)
            .then((res) => {
                dispatch(expertisesActions.setExpertise(res.data));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_EXPERTISE}));
                return done();
            });
    }
});


const addExpertToExpertise = createLogic({
    type: expertisesActions.addExpertToExpertise.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const id = getExpertiseId(state);
        const userId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.ADD_EXPERT_TO_EXPERTISE}));

        service.addExpertToExpertise(id, userId)
            .then((res) => {
                dispatch(expertisesActions.getExpertise(id));
                dispatch(expertisesActions.closeAddExpertModal());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.ADD_EXPERT_TO_EXPERTISE}));
                return done();
            });
    }
});

const removeExpertFromExpertise = createLogic({
    type: expertisesActions.removeExpertFromExpertise.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const id = getExpertiseId(state);
        const userId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.REMOVE_EXPERT_FROM_EXPERTISE}));

        service.removeExpertFromExpertise(id, userId)
            .then((res) => {
                dispatch(expertisesActions.getExpertise(id));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.REMOVE_EXPERT_FROM_EXPERTISE}));
                return done();
            });
    }
});

const approveExpertise = createLogic({
    type: expertisesActions.approveExpertise.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const id = getExpertiseId(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.APPROVE_EXPERTISE}));

        service.approveExpertise(id)
            .then((res) => {
                dispatch(expertisesActions.getExpertise(id));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.APPROVE_EXPERTISE}));
                return done();
            });
    }
});

const sendExpertiseForRework = createLogic({
    type: expertisesActions.sendExpertiseForRework.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const id = getExpertiseId(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.SEND_WP_FOR_REWORK}));

        service.sendForRework(id)
            .then((res) => {
                dispatch(expertisesActions.getExpertise(id));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.SEND_WP_FOR_REWORK}));
                return done();
            });
    }
});


export default [
    getExpertisesList,
    getExpertise,
    addExpertToExpertise,
    removeExpertFromExpertise,
    approveExpertise,
    sendExpertiseForRework,
];
