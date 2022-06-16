import {createLogic} from "redux-logic";
import PracticeActions from "./actions";
import PracticeService from "./service";
import {getId, getPermissionsInfo} from "./getters";
import actions from "../../layout/actions";
import {fetchingTypes, PermissionsInfoFields, PracticeFields} from "./enum";
import {RussianPracticeFields} from "./constants";
import {getErroredFields} from "./validation";

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
                const practiceBaseId = res.data[PracticeFields.PRACTICE_BASE] ?? 1;
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


export default [getPractice, saveField, getTemplateText, createExpertise, approvePractice, sendPracticeToRework, getComments, sendComment];