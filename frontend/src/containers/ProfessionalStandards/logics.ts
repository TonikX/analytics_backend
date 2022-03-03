import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import ProfessionalStandardsActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode} from "./getters";

const service = new Service();

const getProfessionalStandards = createLogic({
    type: ProfessionalStandardsActions.getProfessionalStandards.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_PROFESSIONAL_STANDARDS}));

        service.getProfessionalStandards(currentPage, searchQuery, sortingField, sortingMode)
            .then((res) => {
                const courses = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(ProfessionalStandardsActions.setProfessionalStandards(courses));
                dispatch(ProfessionalStandardsActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_PROFESSIONAL_STANDARDS}));
                return done();
            });
    }
});

const deleteProfessionalStandards = createLogic({
    type: ProfessionalStandardsActions.deleteProfessionalStandard.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const professionalStandardId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_PROFESSIONAL_STANDARDS}));

        service.deleteProfessionalStandards(professionalStandardId)
            .then((res) => {
                dispatch(ProfessionalStandardsActions.getProfessionalStandards());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_PROFESSIONAL_STANDARDS}));
                return done();
            });
    }
});

const createProfessionalStandards = createLogic({
    type: ProfessionalStandardsActions.createNewProfessionalStandard.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const professionalStandard = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_PROFESSIONAL_STANDARDS}));

        service.createProfessionalStandards(professionalStandard)
            .then((res) => {
                dispatch(ProfessionalStandardsActions.getProfessionalStandards());
                dispatch(actions.fetchingSuccess());
                dispatch(ProfessionalStandardsActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_PROFESSIONAL_STANDARDS}));
                return done();
            });
    }
});

const changeProfessionalStandards = createLogic({
    type: ProfessionalStandardsActions.changeProfessionalStandard.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const professionalStandard = action.payload;
        console.log(professionalStandard)
        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_PROFESSIONAL_STANDARDS}));

        service.changeProfessionalStandards(professionalStandard)
            .then((res) => {
                dispatch(ProfessionalStandardsActions.getProfessionalStandards());
                dispatch(actions.fetchingSuccess());
                dispatch(ProfessionalStandardsActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_PROFESSIONAL_STANDARDS}));
                dispatch(ProfessionalStandardsActions.getProfessionalStandard(professionalStandard.id))
                return done();
            });
    }
});


const getProfessionalStandard = createLogic({
    type: ProfessionalStandardsActions.getProfessionalStandard.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        // dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_PROFESSIONAL_STANDARDS}));

        service.getProfessionalStandard(action.payload)
            .then((res) => {
                const professionalStandart = get(res, 'data', {});

                dispatch(ProfessionalStandardsActions.setProfessionalStandard(professionalStandart));
                //      dispatch(actions.fetchingSuccess());
            })
            // .catch((err) => {
            //     dispatch(actions.fetchingFailed(err));
            // })
            .then(() => {
                //   dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_PROFESSIONAL_STANDARDS}));
                return done();

            });
    }
})

const createProfessionalStandardAdditionalFields = createLogic({
    type: ProfessionalStandardsActions.createProfessionalStandardAdditionalFields.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const { profStandardId, name, code, qualificationLevel } = action.payload
        service.createProfessionalStandardAdditionalFields(profStandardId, name, code, qualificationLevel)
            .then(() => {
                dispatch(ProfessionalStandardsActions.getProfessionalStandard(action.payload.id))
                dispatch(actions.fetchingSuccess());

            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                return done();
            });
    }
})

const updateProfessionalStandardAdditionalFields = createLogic({
    type: ProfessionalStandardsActions.updateProfessionalStandardAdditionalFields.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const { id, name, code, qualificationLevel, profStandardId } = action.payload
        service.updateProfessionalStandardAdditionalFields(id, name, code, qualificationLevel)
            .then(() => {
                dispatch(ProfessionalStandardsActions.getProfessionalStandard(profStandardId))
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                return done();
            });
    }
})
const deleteProfessionalStandardAdditionalFields = createLogic({
    type: ProfessionalStandardsActions.deleteProfessionalStandardAdditionalFields.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const { id, laborFunctionId } = action.payload
        service.deleteProfessionalStandardAdditionalFields(laborFunctionId)
            .then(() => {
                dispatch(ProfessionalStandardsActions.getProfessionalStandard(id))
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                return done();
            });
    }
})


export default [
    getProfessionalStandards,
    deleteProfessionalStandards,
    createProfessionalStandards,
    changeProfessionalStandards,
    getProfessionalStandard,
    createProfessionalStandardAdditionalFields,
    updateProfessionalStandardAdditionalFields,
    deleteProfessionalStandardAdditionalFields,
];
