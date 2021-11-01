import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../../layout/actions';
import workProgramActions from '../actions';

import Service from '../service';

import {fetchingTypes} from "../enum";
import {getWorkProgramUserExpertiseId, getWorkProgramExpertiseId, getWorkProgramId} from "../getters";

const service = new Service();

const getComments = createLogic({
    type: workProgramActions.getComments.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const currentStep = action.payload;
        const state = getState();
        const expertiseId = getWorkProgramExpertiseId(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_COMMENTS}));

        service.getComments(expertiseId, currentStep)
            .then((res) => {
                dispatch(workProgramActions.setComments(get(res, 'data.results')));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_COMMENTS}));
                return done();
            });
    }
});

const createComment = createLogic({
    type: workProgramActions.createComment.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const {currentStep, comment} = action.payload;
        const state = getState();
        const userExpertiseId = getWorkProgramUserExpertiseId(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_COMMENT}));

        service.createComment(userExpertiseId, currentStep, comment)
            .then((res) => {
                dispatch(workProgramActions.getComments(currentStep));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_COMMENT}));
                return done();
            });
    }
});

const updateUnreadCommentStatus = createLogic({
    type: workProgramActions.updateUnreadCommentStatus.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const {currentStep} = action.payload;
        const state = getState();
        const wpId = getWorkProgramId(state);

        service.updateUnreadCommentStatus(wpId, currentStep)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram({ id: wpId, quiteLoad: true, getEvaluationToolsList: false }));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                return done();
            });
    }
});

export default [
    getComments,
    createComment,
    updateUnreadCommentStatus,
];
