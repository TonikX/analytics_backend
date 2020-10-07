import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import professionsActions from './actions';

import Service from './service';

import {fetchingTypes, ProfessionsFields} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode, getFilteredRole} from "./getters";

const service = new Service();

const getProfessionsList = createLogic({
    type: professionsActions.getProfessionsList.type,
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

                dispatch(professionsActions.setProfessionsList(courses));
                dispatch(professionsActions.changeAllCount(allPages));
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
    type: professionsActions.deleteProfession.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const professionId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_PROFESSIONS}));

        service.deleteProfession(professionId)
            .then((res) => {
                dispatch(professionsActions.getProfessionsList());
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
    type: professionsActions.createNewProfession.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const profession = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_PROFESSIONS}));

        service.createProfession(profession)
            .then((res) => {
                dispatch(professionsActions.getProfessionsList());
                dispatch(actions.fetchingSuccess());
                dispatch(professionsActions.closeDialog());
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
    type: professionsActions.changeProfession.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const profession = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_PROFESSIONS}));

        service.updateProfession(profession)
            .then((res) => {
                dispatch(professionsActions.getProfessionsList());
                dispatch(actions.fetchingSuccess());
                dispatch(professionsActions.closeDialog());
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

const getProfession = createLogic({
    type: professionsActions.getProfession.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const id = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_PROFESSION}));

        service.getProfession(id)
            .then((res) => {
                dispatch(professionsActions.setProfession(res.data));
                dispatch(actions.fetchingSuccess());
                dispatch(professionsActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_PROFESSION}));
                return done();
            });
    }
});

const getSkillsList = createLogic({
    type: professionsActions.getSkills.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);
        const id = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_SKILLS}));

        service.getSkills(id, currentPage, searchQuery, sortingField, sortingMode)
            .then((res) => {
                const skills = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(professionsActions.setSkills(skills));
                dispatch(professionsActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_SKILLS}));
                return done();
            });
    }
});

const deleteSkill = createLogic({
    type: professionsActions.deleteSkill.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const id = action.payload[ProfessionsFields.ID];
        const professionId = action.payload[ProfessionsFields.PROFESSION];

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_SKILL}));

        service.deleteSkill(id)
            .then((res) => {
                dispatch(professionsActions.getSkills(professionId));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_SKILL}));
                return done();
            });
    }
});

const createNewSkill = createLogic({
    type: professionsActions.createSkill.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const skill = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_SKILL}));

        service.createSkill(skill)
            .then((res) => {
                dispatch(professionsActions.getSkills(skill[ProfessionsFields.PROFESSION]));
                dispatch(actions.fetchingSuccess());
                dispatch(professionsActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_SKILL}));
                return done();
            });
    }
});

const changeSkill = createLogic({
    type: professionsActions.changeSkill.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const skill = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_SKILL}));

        service.updateSkill(skill)
            .then((res) => {
                dispatch(professionsActions.getSkills(skill[ProfessionsFields.PROFESSION]));
                dispatch(actions.fetchingSuccess());
                dispatch(professionsActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_SKILL}));
                return done();
            });
    }
});

export default [
    getProfession,
    getProfessionsList,
    deleteProfession,
    createNewProfession,
    changeProfession,
    getSkillsList,
    createNewSkill,
    deleteSkill,
    changeSkill,
];
