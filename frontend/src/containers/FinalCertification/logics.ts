import {createLogic} from "redux-logic";
import {getId, getMarkCriteriaId} from "./getters";
import CertificationActions from "./actions";
import CertificationService from "./service";
import actions from "../../layout/actions";
import {fetchingTypes} from "./enum";
import {getErroredFields} from "./validation";
import {getPermissionsInfo} from "./getters";
import {PermissionsInfoFields} from "./enum";

const service = new CertificationService();

const getCertification = createLogic({
    type: CertificationActions.getCertification.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const id = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_CERTIFICATION}));
        service.getCertification(id)
            .then((res) => {
                const erroredFields = getErroredFields(res.data);
                console.log(erroredFields);
                dispatch(CertificationActions.setCertification(res.data));
                dispatch(CertificationActions.setErroredFields(erroredFields));
            })
            .catch(() => {
                dispatch(CertificationActions.setError(true));
            })
            .finally(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_CERTIFICATION}));
                return done();
            });
    }
});

const saveField = createLogic({
    type: CertificationActions.saveField.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const id = getId(state);
        const {field, value} = action.payload;
        dispatch(actions.fetchingComponentTrue({destination: field}));
        service.patchCertification({[field]: value}, id)
            .then((res: any) => {
                dispatch(CertificationActions.setField({field, value: res.data[field]}));
            })
            .catch(() => {
                dispatch(actions.fetchingFailed([`Поле ${field} не удалось сохранить. Пожалуйста, перезагрузите страницу или попробуйте позже.`]));
                console.error(`could not save field: ${field}`);
            })
            .finally(() => {
                dispatch(actions.fetchingComponentFalse({destination: field}));
                return done();
            });
    }
});

const saveMarkCriteria = createLogic({
    type: CertificationActions.saveMarkCriteria.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const {field, markType, value} = action.payload;
        const markCriteriaId = getMarkCriteriaId(field)(state);
        const fields = {
            [markType]: value,
        }
        service.patchMarkCriteria(fields, markCriteriaId)
            .then((res: any) => {
                dispatch(CertificationActions.setField({field, value: res.data}));
            })
            .catch(() => {
                console.error(`could not save field: ${field}`);
                dispatch(actions.fetchingFailed([`Поле ${markType} не удалось сохранить. Пожалуйста, перезагрузите страницу или попробуйте позже.`]));
            })
            .finally(() => {
                return done();
            });
    }
});

const getTemplateText = createLogic({
    type: CertificationActions.getTemplateText.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const id = action.payload;
        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_TEMPLATE_TEXT}));
        service.getTemplateText(id)
            .then((res) => {
                dispatch(CertificationActions.setTemplateText(res.data));
            })
            .finally(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_TEMPLATE_TEXT}));
                return done();
            });
    }
});

const createExpertise = createLogic({
    type: CertificationActions.createExpertise.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const {id} = action.payload;
        dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_EXPERTISE}));

        service.createExpertise(id)
            .then(() => {
                dispatch(CertificationActions.getCertification(id));
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

const approveCertification = createLogic({
    type: CertificationActions.approveCertification.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {

        const userExpertiseId = action.payload;
        const state = getState();
        const certificationId = getId(state);
        dispatch(actions.fetchingTrue({destination: fetchingTypes.CHANGE_EXPERTISE_STATE}));

        service.approveCertification(userExpertiseId)
            .then(() => {
                dispatch(CertificationActions.getCertification(certificationId));
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

const sendCertificationToRework = createLogic({
    type: CertificationActions.sendCertificationToRework.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {

        const userExpertiseId = action.payload;
        const state = getState();
        const certificationId = getId(state);
        dispatch(actions.fetchingTrue({destination: fetchingTypes.CHANGE_EXPERTISE_STATE}));

        service.sendCertificationToWork(userExpertiseId)
            .then(() => {
                dispatch(CertificationActions.getCertification(certificationId));
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
    type: CertificationActions.getComments.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const expertiseId = getPermissionsInfo(state)[PermissionsInfoFields.USE_CHAT_WITH_ID_EXPERTISE];
        if (!expertiseId) return;
        service.getComments(expertiseId, 'MA')
            .then((res) => {
                dispatch(CertificationActions.setComments(res.data.results));
            })
            .catch(() => {
            })
            .finally(() => {
                return done();
            });
    }
});

const sendComment = createLogic({
    type: CertificationActions.sendComment.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const {userExpertiseId, step, comment} = action.payload;
        service.sendComment(userExpertiseId, step, comment)
            .then(() => {
                dispatch(CertificationActions.getComments());
            })
            .catch(() => {
            })
            .finally(() => {
                return done();
            });
    }
});


export default [getCertification, saveField, saveMarkCriteria, getTemplateText, createExpertise, approveCertification, sendCertificationToRework, getComments, sendComment];