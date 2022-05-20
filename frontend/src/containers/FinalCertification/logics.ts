import {createLogic} from "redux-logic";
import {getId, getMarkCriteriaId} from "./getters";
import CertificationActions from "./actions";
import CertificationService from "./service";
import actions from "../../layout/actions";
import {fetchingTypes} from "./enum";

const service = new CertificationService();

const getCertification = createLogic({
    type: CertificationActions.getCertification.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const id = action.payload;

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_CERTIFICATION}));
        service.getCertification(id)
            .then((res) => {
                dispatch(CertificationActions.setCertification(res.data));
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
                dispatch(CertificationActions.setCertification(res.data));
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


export default [getCertification, saveField, saveMarkCriteria, getTemplateText];