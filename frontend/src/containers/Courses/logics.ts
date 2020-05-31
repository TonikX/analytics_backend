import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import courseActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode} from "./getters";

const service = new Service();

const getCourses = createLogic({
    type: courseActions.getCourses.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_COURSES}));

        service.getCourses(currentPage, searchQuery, sortingField, sortingMode)
            .then((res) => {
                const courses = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(courseActions.setCourses(courses));
                dispatch(courseActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_COURSES}));
                return done();
            });
    }
});

const deleteCourse = createLogic({
    type: courseActions.deleteCourse.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const courseId = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_COURSE}));

        service.deleteCourse(courseId)
            .then((res) => {
                dispatch(courseActions.getCourses());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_COURSE}));
                return done();
            });
    }
});

const createNewCourse = createLogic({
    type: courseActions.createNewCourse.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_COURSE}));

        service.createCourse(course)
            .then((res) => {
                dispatch(courseActions.getCourses());
                dispatch(actions.fetchingSuccess());
                dispatch(courseActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_COURSE}));
                return done();
            });
    }
});

const updateCourse = createLogic({
    type: courseActions.changeCourse.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const course = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_COURSE}));

        service.updateCourse(course)
            .then((res) => {
                dispatch(courseActions.getCourses());
                dispatch(actions.fetchingSuccess());
                dispatch(courseActions.closeDialog());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_COURSE}));
                return done();
            });
    }
});

export default [
    getCourses,
    deleteCourse,
    createNewCourse,
    updateCourse,
];
