import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import structuralUnitsActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode} from "./getters";

const service = new Service();

const getStructuralUnits = createLogic({
    type: structuralUnitsActions.getStructuralUnits.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_STRUCTURAL_UNITS}));

        // @ts-ignore
        service.getStructuralUnits(currentPage, searchQuery, sortingField, sortingMode)
            .then((res) => {
                const courses = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(structuralUnitsActions.setStructuralUnits(courses));
                dispatch(structuralUnitsActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_STRUCTURAL_UNITS}));
                return done();
            });
    }
});

const deleteStructuralUnits = createLogic({
    type: structuralUnitsActions.deleteStructuralUnit.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const StructuralUnitId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_STRUCTURAL_UNITS}));

        service.deleteStructuralUnit(StructuralUnitId)
            .then((res) => {
                dispatch(structuralUnitsActions.getStructuralUnits());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_STRUCTURAL_UNITS}));
                return done();
            });
    }
});

const createStructuralUnits = createLogic({
    type: structuralUnitsActions.createNewStructuralUnit.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const StructuralUnit = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_STRUCTURAL_UNITS}));

        service.createStructuralUnit(StructuralUnit)
            .then((res) => {
                dispatch(structuralUnitsActions.getStructuralUnits());
                dispatch(actions.fetchingSuccess());
                dispatch(structuralUnitsActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_STRUCTURAL_UNITS}));
                return done();
            });
    }
});

const changeStructuralUnits = createLogic({
    type: structuralUnitsActions.changeStructuralUnit.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const StructuralUnit = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_STRUCTURAL_UNITS}));

        service.changeStructuralUnit(StructuralUnit)
            .then((res) => {
                dispatch(structuralUnitsActions.getStructuralUnits());
                dispatch(actions.fetchingSuccess());
                dispatch(structuralUnitsActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_STRUCTURAL_UNITS}));
                return done();
            });
    }
});

const getStructuralUnit = createLogic({
    type: structuralUnitsActions.getStructuralUnit.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_STRUCTURAL_UNIT}));

        service.getStructuralUnit(action.payload)
            .then((res) => {
                dispatch(structuralUnitsActions.setStructuralUnit(res.data));
                dispatch(actions.fetchingSuccess());
                dispatch(structuralUnitsActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_STRUCTURAL_UNIT}));
                return done();
            });
    }
});

const addUserToStructuralUnit = createLogic({
    type: structuralUnitsActions.addUserToStructuralUnit.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {

        dispatch(actions.fetchingTrue({destination: fetchingTypes.ADD_USER_TO_STRUCTURAL_UNIT}));

        service.addUserToStructuralUnit(action.payload)
            .then((res) => {
                dispatch(structuralUnitsActions.getStructuralUnit(action.payload?.structural_unit));
                dispatch(actions.fetchingSuccess());
                dispatch(structuralUnitsActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.ADD_USER_TO_STRUCTURAL_UNIT}));
                return done();
            });
    }
});

const removeUserFromStructuralUnit = createLogic({
    type: structuralUnitsActions.removeUserFromStructuralUnit.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const {payload}: any = action;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.REMOVE_USER_FROM_STRUCTURAL_UNIT}));

        service.removeUserFromStructuralUnit(payload.userId)
            .then((res) => {
                dispatch(structuralUnitsActions.getStructuralUnit(payload.id));
                dispatch(actions.fetchingSuccess());
                dispatch(structuralUnitsActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.REMOVE_USER_FROM_STRUCTURAL_UNIT}));
                return done();
            });
    }
});

const updateUserFromStructuralUnit = createLogic({
    type: structuralUnitsActions.changeUserFromStructuralUnit.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_USER_FROM_STRUCTURAL_UNIT}));

        service.updateUserFromStructuralUnit(action.payload)
            .then(() => {
                dispatch(structuralUnitsActions.getStructuralUnit(action.payload?.structural_unit));
                dispatch(actions.fetchingSuccess());
                dispatch(structuralUnitsActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_USER_FROM_STRUCTURAL_UNIT}));
                return done();
            });
    }
});

export default [
    getStructuralUnits,
    deleteStructuralUnits,
    createStructuralUnits,
    changeStructuralUnits,
    getStructuralUnit,
    addUserToStructuralUnit,
    removeUserFromStructuralUnit,
    updateUserFromStructuralUnit,
];
