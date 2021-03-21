import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import courseActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
//import {getCurrentPage, getSearchQuery, getSortingField, getSortingMode} from "./getters";

const service = new Service();

const getCourse = createLogic({
    type: courseActions.getCourse.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_COURSE}));
        const courseId: number = action.payload
        service.getCourse(courseId)
            .then((res) => {
                const course = get(res, 'data', {});

                dispatch(courseActions.setCourse(course));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_COURSE}));
                return done();
            });
    }
});

export default [
    getCourse,
];
