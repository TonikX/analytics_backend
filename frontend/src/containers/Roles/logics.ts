import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import rolesActions from './actions';

import Service from './service';

import {fetchingTypes, RolesFields} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode, getFilteredRole} from "./getters";

const service = new Service();

const getRolesList = createLogic({
    type: rolesActions.getRolesList.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);
        const role = getFilteredRole(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_ROLES}));

        service.getRoles(currentPage, searchQuery, sortingField, sortingMode, role)
            .then((res) => {
                const courses = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(rolesActions.setRolesList(courses));
                dispatch(rolesActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_ROLES}));
                return done();
            });
    }
});

const deleteRole = createLogic({
    type: rolesActions.deleteRole.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const roleId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_ROLES}));

        service.deleteRole(roleId)
            .then((res) => {
                dispatch(rolesActions.getRolesList());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_ROLES}));
                return done();
            });
    }
});

const createNewRole = createLogic({
    type: rolesActions.createNewRole.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const role = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_ROLES}));

        service.createRole(role)
            .then((res) => {
                dispatch(rolesActions.getRolesList());
                dispatch(actions.fetchingSuccess());
                dispatch(rolesActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_ROLES}));
                return done();
            });
    }
});

const changeRole = createLogic({
    type: rolesActions.changeRole.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const role = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_ROLES}));

        service.updateRole(role)
            .then((res) => {
                dispatch(rolesActions.getRolesList());
                dispatch(actions.fetchingSuccess());
                dispatch(rolesActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_ROLES}));
                return done();
            });
    }
});

const getRole = createLogic({
    type: rolesActions.getRole.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const id = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_ROLE}));

        service.getRole(id)
            .then((res) => {
                dispatch(rolesActions.setRole(res.data));
                dispatch(actions.fetchingSuccess());
                dispatch(rolesActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_ROLE}));
                return done();
            });
    }
});

const getSkillsList = createLogic({
    type: rolesActions.getSkills.type,
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

                dispatch(rolesActions.setSkills(skills));
                dispatch(rolesActions.changeAllCount(allPages));
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
    type: rolesActions.deleteSkill.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const id = action.payload[RolesFields.ID];
        const roleId = action.payload[RolesFields.ROLE];

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_SKILL}));

        service.deleteSkill(id)
            .then((res) => {
                dispatch(rolesActions.getSkills(roleId));
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
    type: rolesActions.createSkill.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const skill = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_SKILL}));

        service.createSkill(skill)
            .then((res) => {
                dispatch(rolesActions.getSkills(skill[RolesFields.ROLE]));
                dispatch(actions.fetchingSuccess());
                dispatch(rolesActions.closeDialog());
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
    type: rolesActions.changeSkill.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const skill = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_SKILL}));

        service.updateSkill(skill)
            .then((res) => {
                dispatch(rolesActions.getSkills(skill[RolesFields.ROLE]));
                dispatch(actions.fetchingSuccess());
                dispatch(rolesActions.closeDialog());
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
    getRole,
    getRolesList,
    deleteRole,
    createNewRole,
    changeRole,
    getSkillsList,
    createNewSkill,
    deleteSkill,
    changeSkill,
];
