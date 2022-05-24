import {createLogic} from "redux-logic";
import PracticeActions from "./actions";
import PracticeService from "./service";
import {getId} from "./getters";
import actions from "../../layout/actions";
import {fetchingTypes, PracticeFields} from "./enum";
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
                // dispatch(actions.fetchingFailed([`"Экспертиза создана"`]));
                // todo update status and other stuff
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


export default [getPractice, saveField, getTemplateText, createExpertise];