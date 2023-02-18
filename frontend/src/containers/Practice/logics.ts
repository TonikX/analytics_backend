import {createLogic} from "redux-logic";
import PracticeActions from "./actions";
import PracticeService from "./service";
import {getId, getPermissionsInfo} from "./getters";
import actions from "../../layout/actions";
import {DialogType, fetchingTypes, PermissionsInfoFields, PracticeFields} from "./enum";
import {RussianPracticeFields} from "./constants";
import {getErroredFields} from "./validation";
import {fields} from "../WorkProgram/enum";

const service = new PracticeService();

const getPractice = createLogic({
    type: PracticeActions.getPractice.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const id = action.payload;
        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_PRACTICE}));
        service.getPractice(id)
            .then((res) => {
                const erroredFields = getErroredFields(res.data);
                dispatch(PracticeActions.setPractice(res.data));
                dispatch(PracticeActions.setErroredFields(erroredFields));
                const practiceBaseId = res.data[PracticeFields.PRACTICE_BASE].id ?? 1;
                dispatch(PracticeActions.getTemplateText(practiceBaseId));
                if (res.data[PracticeFields.PERMISSIONS_INFO][PermissionsInfoFields.USE_CHAT_WITH_ID_EXPERTISE]) {
                    dispatch(PracticeActions.getComments());
                }
            })
            .catch(() => {
                dispatch(PracticeActions.setError(true));
            })
            .finally(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_PRACTICE}));
                return done();
            });
    }
});

const startLoading = (dispatch: any, field: string) => {
    if (field === PracticeFields.BIBLIOGRAPHIC_REFERENCE) {
        dispatch(actions.fetchingTrue({destination: field}));
    } else {
        dispatch(actions.fetchingComponentTrue({destination: field}));
    }
}

const stopLoading = (dispatch: any, field: string) => {
    if (field === PracticeFields.BIBLIOGRAPHIC_REFERENCE) {
        dispatch(actions.fetchingFalse({destination: field}));
    } else {
        dispatch(actions.fetchingComponentFalse({destination: field}));
    }
}

const saveField = createLogic({
    type: PracticeActions.saveField.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const practiceId = getId(state);
        const {field, value} = action.payload;
        startLoading(dispatch, field);
        service.patchPractice({[field]: value}, practiceId)
            .then((res: any) => {
                dispatch(PracticeActions.setField({field, value: res.data[field]}));
            })
            .catch(() => {
                console.error(`could not save field: ${field}`);
                dispatch(actions.fetchingFailed([`Поле "${(RussianPracticeFields as any)[field]}" не удалось сохранить. Пожалуйста, перезагрузите страницу или попробуйте позже.`]));
            })
            .finally(() => {
                stopLoading(dispatch, field)
                return done();
            });
    }
});

const getTemplateText = createLogic({
    type: PracticeActions.getTemplateText.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const id = action.payload;
        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_TEMPLATE_TEXT}));
        service.getTemplateText(id)
            .then((res) => {
                dispatch(PracticeActions.setTemplateText(res.data));
            })
            .finally(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_TEMPLATE_TEXT}));
                return done();
            });
    }
});

const createExpertise = createLogic({
    type: PracticeActions.createExpertise.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {

        const {id} = action.payload;
        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_EXPERTISE}));

        service.createExpertise(id)
            .then(() => {
                dispatch(PracticeActions.getPractice(id));
            })
            .catch(() => {
                dispatch(actions.fetchingFailed([`Не удалось отправить на экспертизу`]));
            })
            .finally(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_EXPERTISE}));
                return done();
            })
    }
});

const approvePractice = createLogic({
    type: PracticeActions.approvePractice.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {

        const userExpertiseId = action.payload;
        const state = getState();
        const practiceId = getId(state);
        dispatch(actions.fetchingTrue({destination: fetchingTypes.CHANGE_EXPERTISE_STATE}));

        service.approvePractice(userExpertiseId)
            .then(() => {
                dispatch(PracticeActions.getPractice(practiceId));
            })
            .catch(() => {
                dispatch(actions.fetchingFailed([`Не удалось одобрить рабочую программу`]));
            })
            .finally(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CHANGE_EXPERTISE_STATE}));
                return done();
            })
    }
});

const sendPracticeToRework = createLogic({
    type: PracticeActions.sendPracticeToRework.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {

        const userExpertiseId = action.payload;
        const state = getState();
        const practiceId = getId(state);
        dispatch(actions.fetchingTrue({destination: fetchingTypes.CHANGE_EXPERTISE_STATE}));

        service.sendPracticeToWork(userExpertiseId)
            .then(() => {
                dispatch(PracticeActions.getPractice(practiceId));
            })
            .catch(() => {
                dispatch(actions.fetchingFailed([`Не удалось вернуть рабочую программу на доработку`]));
            })
            .finally(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CHANGE_EXPERTISE_STATE}));
                return done();
            })
    }
});

const getComments = createLogic({
    type: PracticeActions.getComments.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const expertiseId = getPermissionsInfo(state)[PermissionsInfoFields.USE_CHAT_WITH_ID_EXPERTISE];
        if (!expertiseId) return;
        service.getComments(expertiseId, 'MA')
            .then((res) => {
                dispatch(PracticeActions.setComments(res.data.results));
            })
            .catch(() => {
            })
            .finally(() => {
                return done();
            });
    }
});

const sendComment = createLogic({
    type: PracticeActions.sendComment.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const {userExpertiseId, step, comment} = action.payload;
        service.sendComment(userExpertiseId, step, comment)
            .then(() => {
                dispatch(PracticeActions.getComments());
            })
            .catch(() => {
            })
            .finally(() => {
                return done();
            });
    }
});

const addPrerequisite = createLogic({
    type: PracticeActions.addPrerequisite.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const practiceId = getId(state);
        const prerequisite = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.ADD_PREREQUISITES}));

        service.addPrerequisites(prerequisite, practiceId)
            .then((res) => {
                dispatch(PracticeActions.getPractice(practiceId));
                // @ts-ignore
                dispatch(actions.fetchingSuccess());
                dispatch(PracticeActions.closeDialog(fields.ADD_NEW_PREREQUISITES));
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.ADD_PREREQUISITES}));
                return done();
            });
    }
});

const changePrerequisite = createLogic({
    type: PracticeActions.changePrerequisite.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const practiceId = getId(state);
        const prerequisite = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CHANGE_PREREQUISITES}));

        service.changePrerequisites(prerequisite, practiceId)
            .then((res) => {
                dispatch(PracticeActions.getPractice(practiceId));
                // @ts-ignore
                dispatch(actions.fetchingSuccess());
                dispatch(PracticeActions.closeDialog(fields.ADD_NEW_PREREQUISITES));
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CHANGE_PREREQUISITES}));
                return done();
            });
    }
});


const deletePrerequisite = createLogic({
    type: PracticeActions.deletePrerequisite.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const practiceId = getId(state);
        const id = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_PREREQUISITES}));

        service.deletePrerequisite(id)
            .then((res) => {
                dispatch(PracticeActions.getPractice(practiceId));
                // @ts-ignore
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_PREREQUISITES}));
                return done();
            });
    }
});

const addResult = createLogic({
    type: PracticeActions.addResult.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const practiceId = getId(state);
        const result = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.ADD_RESULT}));

        service.addResult(result, practiceId)
            .then(() => {
                dispatch(PracticeActions.getPractice(practiceId));
                // @ts-ignore
                dispatch(actions.fetchingSuccess());
                dispatch(PracticeActions.closeDialog({dialogType: DialogType.RESULTS}));
            })
            // @ts-ignore
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.ADD_RESULT}));
                return done();
            });
    }
});

const changeResult = createLogic({
    type: PracticeActions.changeResult.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const practiceId = getId(state);
        const result = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.CHANGE_RESULT}));

        service.changeResult(result)
            .then(() => {
                dispatch(PracticeActions.getPractice(practiceId));
                // @ts-ignore
                dispatch(actions.fetchingSuccess());
                dispatch(PracticeActions.closeDialog({dialogType: DialogType.RESULTS}));
            })
            // @ts-ignore
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.CHANGE_RESULT}));
                return done();
            });
    }
});


const deleteResult = createLogic({
    type: PracticeActions.deleteResult.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const practiceId = getId(state);
        const id = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_RESULT}));

        service.deleteResult(id)
            .then(() => {
                dispatch(PracticeActions.getPractice(practiceId));
                // @ts-ignore
                dispatch(actions.fetchingSuccess());
            })
            // @ts-ignore
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_RESULT}));
                return done();
            });
    }
});

const getCompetenceDirectionsDependedOnPractice = createLogic({
    type: PracticeActions.getCompetencesDependedOnPractice.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_COMPETENCE_DIRECTIONS_DEPENDED_ON_PRACTICE}));

        service.getCompetenceDirectionsDependedOnPractice(action.payload)
            .then((res) => {
                dispatch(PracticeActions.setCompetencesDependedOnPractice(res.data));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_COMPETENCE_DIRECTIONS_DEPENDED_ON_PRACTICE}));
                return done();
            });
    }
});

const saveZUN = createLogic({
    type: PracticeActions.saveZUN.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const practiceId = getId(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.SAVE_ZUN}));

        service.saveZUN(action.payload)
            .then(() => {
                dispatch(PracticeActions.getPractice(practiceId));
                dispatch(actions.fetchingSuccess());
            })
            //@ts-ignore
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.SAVE_ZUN}));
                return done();
            });
    }
});

const deleteZUN = createLogic({
    type: PracticeActions.deleteZUN.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const practiceId = getId(state);
        dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_ZUN}));

        service.deleteZUN(action.payload)
            .then(() => {
                dispatch(PracticeActions.getPractice(practiceId));
                dispatch(actions.fetchingSuccess());
            })
            //@ts-ignore
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_ZUN}));
                return done();
            });
    }
});


export default [
    getPractice, saveField, getTemplateText, createExpertise, approvePractice, sendPracticeToRework,
    getComments, sendComment, addPrerequisite, changePrerequisite, deletePrerequisite,
    addResult, deleteResult, changeResult, getCompetenceDirectionsDependedOnPractice,
    deleteZUN, saveZUN
];
