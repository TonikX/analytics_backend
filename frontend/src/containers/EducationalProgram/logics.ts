import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import educationalPlanActions from './actions';

import Service from './service';

import {EducationProgramCharacteristicFields, fetchingTypes} from "./enum";
import {
  getCurrentPage,
  getEducationalProgramCharacteristicId,
  getSearchQuery,
  getSortingField,
  getEducationalProgramCharacteristic,
  getSortingMode
} from "./getters";
import generalActions from "../../layout/actions";

const service = new Service();

const getEducationalProgramList = createLogic({
  type: educationalPlanActions.getEducationalProgramList.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const state = getState();

    const currentPage = getCurrentPage(state);
    const searchQuery = getSearchQuery(state);
    const sortingField = getSortingField(state);
    const sortingMode = getSortingMode(state);

    dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_EDUCATION_PROGRAM_LIST}));

    service.getEducationalProgramList(currentPage, searchQuery, sortingField, sortingMode)
      .then((res) => {
        const courses = get(res, 'data.results', []);
        const allPages = Math.ceil(get(res, 'data.count', 0));

        dispatch(educationalPlanActions.setEducationalProgramList(courses));
        dispatch(educationalPlanActions.changeAllCount(allPages));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_EDUCATION_PROGRAM_LIST}));
        return done();
      });
  }
});


const deleteEducationalProgram = createLogic({
  type: educationalPlanActions.deleteEducationalProgram.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const id = action.payload;

    dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_EDUCATION_PROGRAM}));

    service.deleteEducationProgram(id)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramList());
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_EDUCATION_PROGRAM}));
        return done();
      });
  }
});


const sendToCheck = createLogic({
  type: educationalPlanActions.sendToCheck.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const characteristicId = getEducationalProgramCharacteristicId(getState());

    dispatch(actions.fetchingTrue({destination: fetchingTypes.SEND_TO_CHECK}));

    service.sendToCheck(characteristicId)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(characteristicId));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.SEND_TO_CHECK}));
        return done();
      });
  }
});


const createEducationalProgram = createLogic({
  type: educationalPlanActions.createEducationalProgram.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const program = action.payload;

    dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_EDUCATION_PROGRAM}));

    service.createEducationProgram(program)
      .then(() => {
        dispatch(educationalPlanActions.closeDialog());
        dispatch(educationalPlanActions.getEducationalProgramList());
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_EDUCATION_PROGRAM}));
        return done();
      });
  }
});

const changeEducationalProgram = createLogic({
  type: educationalPlanActions.changeEducationalProgram.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const {payload, id} = action.payload;

    dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_EDUCATION_PROGRAM}));

    service.updateEducationProgram(id, payload)
      .then(() => {
        dispatch(educationalPlanActions.closeDialog());
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(id));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_EDUCATION_PROGRAM}));
        return done();
      });
  }
});

const getCompetenceMatrix = createLogic({
  type: educationalPlanActions.getCompetenceMatrix.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_COMPETENCE_MATRIX}));

    service.getCompetenceMatrix(action.payload)
      .then((res) => {
        dispatch(educationalPlanActions.setCompetenceMatrix(res.data));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_COMPETENCE_MATRIX}));
        return done();
      });
  }
});

const saveZun = createLogic({
    type: educationalPlanActions.saveZun.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.SAVE_ZUN}));

        const competenceMatrixId = getEducationalProgramCharacteristicId(getState());
        const {indicators, workprogram_id, onlyCurrentGh, practice_id, skipReload} = action.payload;

        if (onlyCurrentGh) {
          service.saveZUN({
            gh_id: competenceMatrixId,
            indicators,
            workprogram_id,
            practice_id,
          })
              .then(() => {
                if (!skipReload) {
                  dispatch(educationalPlanActions.getCompetenceMatrix(competenceMatrixId));
                  dispatch(actions.fetchingSuccess());
                } else {
                  dispatch(generalActions.fetchingSuccess(['Вы добавили индикатор, но не перезагрузили страницу. Перезагрузите страницу, чтобы увидеть изменения']));
                }
              })
              .catch((err) => {
                dispatch(actions.fetchingFailed(err));
              })
              .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.SAVE_ZUN}));
                return done();
              });
        } else {
          service.saveZunAllGh({
            indicators,
            workprogram_id,
            practice_id,
          })
              .then(() => {
                if (!skipReload) {
                  dispatch(educationalPlanActions.getCompetenceMatrix(competenceMatrixId));
                  dispatch(actions.fetchingSuccess());
                } else {
                  dispatch(generalActions.fetchingSuccess(['Вы добавили индикатор, но не перезагрузили страницу. Перезагрузите страницу, чтобы увидеть изменения']));
                }
              })
              .catch((err) => {
                dispatch(actions.fetchingFailed(err));
              })
              .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.SAVE_ZUN}));
                return done();
              });
        }
    }
});

const deleteZun = createLogic({
  type: educationalPlanActions.deleteZun.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_ZUN}));

    const competenceMatrixId = getEducationalProgramCharacteristicId(getState());
    const {id, practice_id, skipReload} = action.payload;

    service.deleteZUN(id, practice_id)
      .then(() => {
        dispatch(actions.fetchingSuccess(['Индикатор успешно удален']));
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_ZUN}));
        if (!skipReload) {
          dispatch(educationalPlanActions.getCompetenceMatrix(competenceMatrixId));
        }
        return done();
      })
  }
});

const getEducationalProgramCharacteristicLogic = createLogic({
  type: educationalPlanActions.getEducationalProgramCharacteristic.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_EDUCATION_PROGRAM_LIST}));

    service.getEducationalProgramCharacteristic(action.payload)
      .then((res) => {
        dispatch(educationalPlanActions.setEducationalProgramCharacteristic(res.data));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_EDUCATION_PROGRAM_LIST}));
        return done();
      });
  }
});


const changeEducationalProgramCharacteristic = createLogic({
  type: educationalPlanActions.changeEducationalProgramCharacteristic.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const {payload, id} = action.payload;

    dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_EDUCATION_PROGRAM}));

    service.updateEducationProgramCharacteristic(id, payload)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(id));
        dispatch(actions.fetchingSuccess());
        dispatch(educationalPlanActions.closeDialog());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_EDUCATION_PROGRAM}));
        return done();
      });
  }
});

const characteristicCreateGroup = createLogic({
  type: educationalPlanActions.characteristicCreateGroup.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const characteristicId = getEducationalProgramCharacteristicId(getState());

    dispatch(actions.fetchingTrue({destination: fetchingTypes.CHARACTERISTIC_CREATE_COMPETENCE_GROUP}));

    service.characteristicCreateGroup(action.payload, characteristicId)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(characteristicId));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CHARACTERISTIC_CREATE_COMPETENCE_GROUP}));
        return done();
      });
  }
});
const characteristicDeleteGroup = createLogic({
  type: educationalPlanActions.characteristicDeleteGroup.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const characteristicId = getEducationalProgramCharacteristicId(getState());

    dispatch(actions.fetchingTrue({destination: fetchingTypes.CHARACTERISTIC_DELETE_COMPETENCE_GROUP}));

    service.characteristicDeleteGroup(action.payload)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(characteristicId));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CHARACTERISTIC_DELETE_COMPETENCE_GROUP}));
        return done();
      });
  }
});

const characteristicSaveCompetence = createLogic({
  type: educationalPlanActions.characteristicSaveCompetence.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const characteristicId = getEducationalProgramCharacteristicId(getState());

    dispatch(actions.fetchingTrue({destination: fetchingTypes.CHARACTERISTIC_SAVE_COMPETENCE}));

    service.characteristicSaveCompetence(action.payload)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(characteristicId));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CHARACTERISTIC_SAVE_COMPETENCE}));
        return done();
      });
  }
});

const characteristicDeleteCompetence = createLogic({
  type: educationalPlanActions.characteristicDeleteCompetence.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const characteristicId = getEducationalProgramCharacteristicId(getState());

    dispatch(actions.fetchingTrue({destination: fetchingTypes.CHARACTERISTIC_DELETE_COMPETENCE}));

    service.characteristicDeleteCompetence(action.payload)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(characteristicId));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CHARACTERISTIC_DELETE_COMPETENCE}));
        return done();
      });
  }
});

const characteristicSaveIndicator = createLogic({
  type: educationalPlanActions.characteristicSaveIndicator.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const characteristicId = getEducationalProgramCharacteristicId(getState());

    dispatch(actions.fetchingTrue({destination: fetchingTypes.CHARACTERISTIC_SAVE_INDICATOR}));

    service.characteristicSaveIndicator(action.payload)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(characteristicId));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CHARACTERISTIC_SAVE_INDICATOR}));
        return done();
      });
  }
});

const characteristicDeleteIndicator = createLogic({
  type: educationalPlanActions.characteristicDeleteIndicator.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const characteristicId = getEducationalProgramCharacteristicId(getState());

    dispatch(actions.fetchingTrue({destination: fetchingTypes.CHARACTERISTIC_DELETE_INDICATOR}));

    service.characteristicDeleteIndicator(action.payload)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(characteristicId));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CHARACTERISTIC_DELETE_INDICATOR}));
        return done();
      });
  }
});

const characteristicSaveGroupTitle = createLogic({
  type: educationalPlanActions.characteristicSaveGroupTitle.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const characteristicId = getEducationalProgramCharacteristicId(getState());

    dispatch(actions.fetchingTrue({destination: fetchingTypes.CHARACTERISTIC_SAVE_GROUP_TITLE}));

    service.characteristicSaveGroupTitle(action.payload)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(characteristicId));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CHARACTERISTIC_SAVE_GROUP_TITLE}));
        return done();
      });
  }
});

const characteristicSaveCompetenceLaborFunction = createLogic({
  type: educationalPlanActions.characteristicSaveCompetenceLaborFunction.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const characteristicId = getEducationalProgramCharacteristicId(getState());

    dispatch(actions.fetchingTrue({destination: fetchingTypes.CHARACTERISTIC_SAVE_COMPETENCE_LABOR_FUNCTION}));

    service.characteristicSaveCompetenceLaborFunction(action.payload)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(characteristicId));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CHARACTERISTIC_SAVE_COMPETENCE_LABOR_FUNCTION}));
        return done();
      });
  }
});

const characteristicSaveCompetenceKindsOfActivity = createLogic({
  type: educationalPlanActions.characteristicSaveCompetenceKindsOfActivity.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const characteristicId = getEducationalProgramCharacteristicId(getState());

    dispatch(actions.fetchingTrue({destination: fetchingTypes.CHARACTERISTIC_SAVE_COMPETENCE_KIND_OF_ACTIVITY}));

    service.characteristicSaveCompetenceKindOfActivity(action.payload)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(characteristicId));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CHARACTERISTIC_SAVE_COMPETENCE_KIND_OF_ACTIVITY}));
        return done();
      });
  }
});

const characteristicSaveProfessionalStandard = createLogic({
  type: educationalPlanActions.characteristicSaveProfessionalStandard.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const characteristicId = getEducationalProgramCharacteristicId(getState());

    dispatch(actions.fetchingTrue({destination: fetchingTypes.CHARACTERISTIC_SAVE_PROFESSIONAL_STANDARD}));

    service.characteristicSaveProfessionalStandard(action.payload)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(characteristicId));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CHARACTERISTIC_SAVE_PROFESSIONAL_STANDARD}));
        return done();
      });
  }
});

const characteristicSaveProfessionalStandardLaborFunction = createLogic({
  type: educationalPlanActions.characteristicSaveProfessionalStandardLaborFunction.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const characteristicId = getEducationalProgramCharacteristicId(getState());

    dispatch(actions.fetchingTrue({destination: fetchingTypes.CHARACTERISTIC_SAVE_PROFESSIONAL_STANDARD_LABOR_FUNCTION}));

    service.characteristicSaveProfessionalStandardLaborFunction(action.payload)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(characteristicId));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CHARACTERISTIC_SAVE_PROFESSIONAL_STANDARD_LABOR_FUNCTION}));
        return done();
      });
  }
});


const characteristicDeleteProfessionalStandardLaborFunction = createLogic({
  type: educationalPlanActions.characteristicDeleteProfessionalStandardLaborFunction.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const characteristicId = getEducationalProgramCharacteristicId(getState());

    dispatch(actions.fetchingTrue({destination: fetchingTypes.CHARACTERISTIC_DELETE_PROFESSIONAL_STANDARD_LABOR_FUNCTION}));

    service.characteristicDeleteProfessionalStandardLaborFunction(action.payload)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(characteristicId));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CHARACTERISTIC_DELETE_PROFESSIONAL_STANDARD_LABOR_FUNCTION}));
        return done();
      });
  }
});

const characteristicSaveKindOfActivity = createLogic({
  type: educationalPlanActions.characteristicSaveKindOfActivity.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const characteristicId = getEducationalProgramCharacteristicId(getState());

    dispatch(actions.fetchingTrue({destination: fetchingTypes.CHARACTERISTIC_SAVE_KIND_OF_ACTIVITY}));

    service.characteristicSaveKindOfActivity(action.payload)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(characteristicId));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CHARACTERISTIC_SAVE_KIND_OF_ACTIVITY}));
        return done();
      });
  }
});

const characteristicDeleteProfessionalStandard = createLogic({
  type: educationalPlanActions.characteristicDeleteProfessionalStandard.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const characteristicId = getEducationalProgramCharacteristicId(getState());

    dispatch(actions.fetchingTrue({destination: fetchingTypes.CHARACTERISTIC_DELETE_PROFESSIONAL_STANDARD}));

    service.characteristicDeleteProfessionalStandard(action.payload)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(characteristicId));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CHARACTERISTIC_DELETE_PROFESSIONAL_STANDARD}));
        return done();
      });
  }
});

const characteristicDeleteKindOfActivity = createLogic({
  type: educationalPlanActions.characteristicDeleteKindOfActivity.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const characteristicId = getEducationalProgramCharacteristicId(getState());

    dispatch(actions.fetchingTrue({destination: fetchingTypes.CHARACTERISTIC_DELETE_KIND_OF_ACTIVITY}));

    service.characteristicDeleteKindOfActivity(action.payload)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(characteristicId));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CHARACTERISTIC_DELETE_KIND_OF_ACTIVITY}));
        return done();
      });
  }
});

const createKindOfActivity = createLogic({
  type: educationalPlanActions.createKindOfActivity.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const characteristic = getEducationalProgramCharacteristic(getState());

    dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_KIND_OF_ACTIVITY}));

    service.createKindOfActivity(action.payload)
      .then((res: any) => {
        //@ts-ignore
        const allActivities = characteristic[EducationProgramCharacteristicFields.KINDS_OF_ACTIVITIES]?.map((item: any) => item.id)

        dispatch(educationalPlanActions.changeEducationalProgramCharacteristic({
          //@ts-ignore
          id: characteristic?.id,
          payload: {
            [EducationProgramCharacteristicFields.KINDS_OF_ACTIVITIES]: [
              res?.data?.id,
              ...allActivities,
            ]
          }
        }));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_KIND_OF_ACTIVITY}));
        return done();
      });
  }
});

const createObjectOfActivity = createLogic({
  type: educationalPlanActions.createObjectOfActivity.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const characteristic = getEducationalProgramCharacteristic(getState());

    dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_OBJECT_OF_ACTIVITY}));

    service.createObjectOfActivity(action.payload)
      .then((res: any) => {
        //@ts-ignore
        const allActivities = characteristic[EducationProgramCharacteristicFields.OBJECTS_OF_ACTIVITY]?.map((item: any) => item.id)

        dispatch(educationalPlanActions.changeEducationalProgramCharacteristic({
          //@ts-ignore
          id: characteristic?.id,
          payload: {
            [EducationProgramCharacteristicFields.OBJECTS_OF_ACTIVITY]: [
              res?.data?.id,
              ...allActivities,
            ]
          }
        }));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_OBJECT_OF_ACTIVITY}));
        return done();
      });
  }
});

const createTasksType = createLogic({
  type: educationalPlanActions.createTaskType.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const characteristic = getEducationalProgramCharacteristic(getState());

    dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_TASKS_TYPE}));

    service.createTaskType(action.payload)
      .then((res: any) => {
        //@ts-ignore
        const allActivities = characteristic[EducationProgramCharacteristicFields.CREATE_TASKS_TYPE]?.map((item: any) => item.id)

        dispatch(educationalPlanActions.changeEducationalProgramCharacteristic({
          //@ts-ignore
          id: characteristic?.id,
          payload: {
            [EducationProgramCharacteristicFields.OBJECTS_OF_ACTIVITY]: [
              res?.data?.id,
              ...allActivities,
            ]
          }
        }));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_OBJECT_OF_ACTIVITY}));
        return done();
      });
  }
});

const getKindsOfActivity = createLogic({
  type: educationalPlanActions.getKindsOfActivity.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_KIND_OF_ACTIVITY}));

    service.getKindsOfActivity(action.payload)
      .then((res) => {
        dispatch(educationalPlanActions.setKindsOfActivity(res?.data?.results));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_KIND_OF_ACTIVITY}));
        return done();
      });
  }
});

const getObjectsOfActivity = createLogic({
  type: educationalPlanActions.getObjectsOfActivity.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_OBJECTS_OF_ACTIVITY}));

    service.getObjectsOfActivity(action.payload)
      .then((res) => {
        dispatch(educationalPlanActions.setObjectsOfActivity(res?.data?.results));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_OBJECTS_OF_ACTIVITY}));
        return done();
      });
  }
});

const getTasksTypes = createLogic({
  type: educationalPlanActions.getTasksTypes.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_TASKS_TYPES}));

    service.getTaskTypes(action.payload)
      .then((res) => {
        dispatch(educationalPlanActions.setTasksTypes(res?.data?.results));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_TASKS_TYPES}));
        return done();
      });
  }
});

const getCompetenceDirectionsDependedOnWorkProgram = createLogic({
  type: educationalPlanActions.getCompetenceDirectionsDependedOnWorkProgram.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_COMPETENCE_DIRECTIONS_DEPENDED_ON_WORK_PROGRAM}));

    const competenceMatrixId = getEducationalProgramCharacteristicId(getState());

    service.getCompetenceDirectionsDependedOnWorkProgram(action.payload, competenceMatrixId)
      .then((res) => {
        dispatch(educationalPlanActions.setDirectionsDependedOnWorkProgram(res.data));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_COMPETENCE_DIRECTIONS_DEPENDED_ON_WORK_PROGRAM}));
        return done();
      });
  }
});

const addNewRepresentative = createLogic({
  type: educationalPlanActions.addNewRepresentative.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: fetchingTypes.ADD_NEW_REPRESENTATIVE}));

    const characteristicId = getEducationalProgramCharacteristicId(getState());

    service.addNewRepresentative(characteristicId, action.payload)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(characteristicId));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.ADD_NEW_REPRESENTATIVE}));
        return done();
      });
  }
});

const deleteRepresentative = createLogic({
  type: educationalPlanActions.deleteRepresentative.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_REPRESENTATIVE}));

    const characteristicId = getEducationalProgramCharacteristicId(getState());

    service.deleteRepresentative(action.payload)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(characteristicId));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_REPRESENTATIVE}));
        return done();
      });
  }
});

const updateRepresentative = createLogic({
  type: educationalPlanActions.updateRepresentative.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_REPRESENTATIVE}));

    const characteristicId = getEducationalProgramCharacteristicId(getState());

    service.updateRepresentative(action.payload.id, action.payload.data)
      .then(() => {
        dispatch(educationalPlanActions.getEducationalProgramCharacteristic(characteristicId));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_REPRESENTATIVE}));
        return done();
      });
  }
});

export default [
  getEducationalProgramList,
  deleteEducationalProgram,
  createEducationalProgram,
  changeEducationalProgram,

  changeEducationalProgramCharacteristic,
  getEducationalProgramCharacteristicLogic,

  characteristicCreateGroup,
  characteristicDeleteGroup,

  characteristicSaveCompetence,
  characteristicDeleteCompetence,

  characteristicSaveIndicator,
  characteristicDeleteIndicator,

  characteristicSaveGroupTitle,
  characteristicSaveCompetenceLaborFunction,
  characteristicSaveCompetenceKindsOfActivity,

  characteristicSaveProfessionalStandard,
  characteristicDeleteProfessionalStandard,

  characteristicSaveProfessionalStandardLaborFunction,
  characteristicDeleteProfessionalStandardLaborFunction,

  characteristicSaveKindOfActivity,
  characteristicDeleteKindOfActivity,

  createKindOfActivity,
  getKindsOfActivity,

  createObjectOfActivity,
  getObjectsOfActivity,

  createTasksType,
  getTasksTypes,

  getCompetenceMatrix,
  saveZun,
  deleteZun,

  getCompetenceDirectionsDependedOnWorkProgram,

  addNewRepresentative,
  deleteRepresentative,
  updateRepresentative,
  sendToCheck,
];
