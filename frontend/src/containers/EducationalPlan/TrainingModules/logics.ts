import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../../layout/actions';
import trainingModuleActions from './actions';

import Service from './service';

import {fetchingTypes, TrainingModuleFields} from "./enum";
import {
    getCurrentPage,
    getSearchQuery,
    getSortingField,
    getSortingMode,
    getShowOnlyMy,
    getTrainingModuleId
} from "./getters";
import moduleActions from "./actions";
import workProgramActions from "../../WorkProgram/actions";
import {getWorkProgramId} from "../../WorkProgram/getters";
import {fields} from "../../WorkProgram/enum";

const service = new Service();

const getTrainingModulesList = createLogic({
    type: trainingModuleActions.getTrainingModulesList.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const currentPage = getCurrentPage(state);
        const searchQuery = getSearchQuery(state);
        const sortingField = getSortingField(state);
        const sortingMode = getSortingMode(state);
        const showOnlyMy = getShowOnlyMy(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_TRAINING_MODULES}));

        service.getTrainingModules(currentPage, searchQuery, sortingField, sortingMode, showOnlyMy)
            .then((res) => {
                const results = get(res, 'data.results', []);
                const allPages = Math.ceil(get(res, 'data.count', 0));

                dispatch(trainingModuleActions.setTrainingModulesList(results));
                dispatch(trainingModuleActions.changeAllCount(allPages));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_TRAINING_MODULES}));
                return done();
            });
    }
});

const createTrainingModule = createLogic({
    type: trainingModuleActions.createTrainingModule.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_TRAINING_MODULE}));

        service.createTrainingModule(action.payload)
            .then((res) => {
                const moduleId = getTrainingModuleId(getState());

                if (moduleId){
                    //@ts-ignore
                    dispatch(moduleActions.getTrainingModule(moduleId));
                } else {
                    dispatch(trainingModuleActions.getTrainingModulesList());
                }
                dispatch(trainingModuleActions.closeDialog());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_TRAINING_MODULE}));
                return done();
            });
    }
});

const changeTrainingModule = createLogic({
    type: trainingModuleActions.changeTrainingModule.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.CHANGE_TRAINING_MODULE}));

        service.changeTrainingModule(action.payload)
            .then((res) => {
                const moduleId = getTrainingModuleId(getState());

                if (moduleId){
                    //@ts-ignore
                    dispatch(moduleActions.getTrainingModule(moduleId));
                } else {
                    dispatch(trainingModuleActions.getTrainingModulesList());
                }

                dispatch(trainingModuleActions.closeDialog());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CHANGE_TRAINING_MODULE}));
                return done();
            });
    }
});

const removeFatherFromModule = createLogic({
    type: trainingModuleActions.removeFatherFromModule.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.CHANGE_TRAINING_MODULE}));

        service.removeFatherFromModule(action.payload)
            .then((res) => {
                const moduleId = getTrainingModuleId(getState());
                //@ts-ignore
                dispatch(moduleActions.getTrainingModule(moduleId));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CHANGE_TRAINING_MODULE}));
                return done();
            });
    }
});

const deleteTrainingModule = createLogic({
    type: trainingModuleActions.deleteTrainingModule.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_TRAINING_MODULE}));

        service.deleteTrainingModule(action.payload)
            .then((res) => {
                dispatch(trainingModuleActions.getTrainingModulesList());
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_TRAINING_MODULE}));
                return done();
            });
    }
});

const getTrainingModule = createLogic({
    type: trainingModuleActions.getTrainingModule.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_TRAINING_MODULE}));

        service.getTrainingModule(action.payload)
            .then((res) => {
                dispatch(trainingModuleActions.setTrainingModule(res.data));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_TRAINING_MODULE}));
                return done();
            });
    }
});

const changeEditorList = createLogic({
    type: trainingModuleActions.changeEditorList.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.CHANGE_TRAINING_MODULE}));

        service.changeTrainingModule(action.payload)
            .then(() => {
                //@ts-ignore
                dispatch(trainingModuleActions.getTrainingModule(action.payload.data[TrainingModuleFields.ID]));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CHANGE_TRAINING_MODULE}));
                return done();
            });
    }
});

const addIntermediateCertification = createLogic({
    type: trainingModuleActions.addIntermediateCertification.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const evaluationTool = action.payload;
        const moduleId = getTrainingModuleId(getState());

        dispatch(actions.fetchingTrue({destination: fetchingTypes.ADD_INTERMEDIATE_CERTIFICATION}));

        service.addIntermediateCertification(evaluationTool, moduleId)
          .then((res) => {
            //@ts-ignore
            dispatch(trainingModuleActions.getTrainingModule(moduleId));
            dispatch(actions.fetchingSuccess());
            dispatch(trainingModuleActions.closeDialog());
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
    type: trainingModuleActions.changeIntermediateCertification.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const evaluationTool = action.payload;
        const moduleId = getTrainingModuleId(getState());

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CHANGE_INTERMEDIATE_CERTIFICATION}));

        service.changeIntermediateCertification(evaluationTool)
          .then((res) => {
            //@ts-ignore
            dispatch(trainingModuleActions.getTrainingModule(moduleId));
            dispatch(actions.fetchingSuccess());
            dispatch(trainingModuleActions.closeDialog());
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
    type: trainingModuleActions.deleteIntermediateCertification.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const id = action.payload;
        const moduleId = getTrainingModuleId(getState());


      dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_INTERMEDIATE_CERTIFICATION}));

        service.deleteIntermediateCertification(id)
          .then((res) => {
            //@ts-ignore
            dispatch(trainingModuleActions.getTrainingModule(moduleId));
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

const getIntermediateCertification = createLogic({
    type: trainingModuleActions.getIntermediateCertification.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_INTERMEDIATE_CERTIFICATION}));

        service.getIntermediateCertification(action.payload)
          .then((res) => {
              dispatch(workProgramActions.setIntermediateCertification(res.data));
              dispatch(actions.fetchingSuccess());
          })
          .catch((err) => {
              dispatch(actions.fetchingFailed(err));
          })
          .then(() => {
              dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_INTERMEDIATE_CERTIFICATION}));
              return done();
          });
    }
});

export default [
    getTrainingModulesList,
    createTrainingModule,
    changeTrainingModule,
    deleteTrainingModule,
    getTrainingModule,
    changeEditorList,
    removeFatherFromModule,
    changeIntermediateCertification,
    addIntermediateCertification,
    deleteIntermediateCertification,
    getIntermediateCertification,
];
