import {createLogic} from "redux-logic";

import actions from '../../../layout/actions';
import workProgramActions from '../actions';

import Service from '../service';

import {fetchingTypes, fields} from "../enum";
import {getWorkProgramId} from "../getters";

const service = new Service();

const addIntermediateCertification = createLogic({
    type: workProgramActions.addIntermediateCertification.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const evaluationTool = action.payload;
        const workProgramId = getWorkProgramId(getState());

        dispatch(actions.fetchingTrue({destination: fetchingTypes.ADD_INTERMEDIATE_CERTIFICATION}));

        service.addIntermediateCertification(evaluationTool, workProgramId)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram(workProgramId));
                dispatch(actions.fetchingSuccess());
                dispatch(workProgramActions.closeDialog(fields.CREATE_NEW_INTERMEDIATE_CERTIFICATION));
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.ADD_INTERMEDIATE_CERTIFICATION}));
                return done();
            });
    }
});

const changeIntermediateCertification = createLogic({
    type: workProgramActions.changeIntermediateCertification.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const evaluationTool = action.payload;
        const workProgramId = getWorkProgramId(getState());

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CHANGE_INTERMEDIATE_CERTIFICATION}));

        service.changeIntermediateCertification(evaluationTool)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram(workProgramId));
                dispatch(actions.fetchingSuccess());
                dispatch(workProgramActions.closeDialog(fields.CREATE_NEW_INTERMEDIATE_CERTIFICATION));
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CHANGE_INTERMEDIATE_CERTIFICATION}));
                return done();
            });
    }
});


const deleteIntermediateCertification = createLogic({
    type: workProgramActions.deleteIntermediateCertification.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const id = action.payload;
        const workProgramId = getWorkProgramId(getState());

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_INTERMEDIATE_CERTIFICATION}));

        service.deleteIntermediateCertification(id)
            .then((res) => {
                dispatch(workProgramActions.getWorkProgram(workProgramId));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_INTERMEDIATE_CERTIFICATION}));
                return done();
            });
    }
});

export default [
    changeIntermediateCertification,
    addIntermediateCertification,
    deleteIntermediateCertification,
];
