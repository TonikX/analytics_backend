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
            .then((res) => {

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


const createEducationalProgram = createLogic({
    type: educationalPlanActions.createEducationalProgram.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const program = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_EDUCATION_PROGRAM}));

        service.createEducationProgram(program)
            .then((res) => {
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
            .then((res) => {
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
            .then((res) => {
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
            .then((res) => {
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
            .then((res) => {
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
            .then((res) => {
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
            .then((res) => {
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
            .then((res) => {
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
            .then((res) => {
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
            .then((res) => {
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
            .then((res) => {
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
            .then((res) => {
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
            .then((res) => {
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

const characteristicSaveKindOfActivity = createLogic({
    type: educationalPlanActions.characteristicSaveKindOfActivity.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const characteristicId = getEducationalProgramCharacteristicId(getState());

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CHARACTERISTIC_SAVE_KIND_OF_ACTIVITY}));

        service.characteristicSaveKindOfActivity(action.payload)
            .then((res) => {
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
            .then((res) => {
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
            .then((res) => {
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

    characteristicSaveKindOfActivity,
    characteristicDeleteKindOfActivity,

    createKindOfActivity,
    getKindsOfActivity,
];
