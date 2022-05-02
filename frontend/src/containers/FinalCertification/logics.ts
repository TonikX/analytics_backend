import {createLogic} from "redux-logic";
import {getId} from "./getters";
import CertificationActions from "./actions";
import CertificationService from "./service";

const service = new CertificationService();

const getCertification = createLogic({
    type: CertificationActions.getCertification.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const id = action.payload;
        service.getCertification(id)
            .then((res) => {
                dispatch(CertificationActions.setCertification(res.data));
            })
            .finally(() => {
                return done();
            });
    }
});

const saveCertification = createLogic({
    type: CertificationActions.saveCertification.type,
    latest: true,

    process({getState, action}: any, dispatch, done) {
        const {id, certification} = action.payload;
        service.saveCertification(certification, id)
            .then((res) => {
            })
            .finally(() => {
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
        service.patchCertification({[field]: value}, id)
            .then((res: any) => {
                dispatch(CertificationActions.setCertification(res.data));
            })
            .catch((err) => {
                console.error(`could not save field: ${field}`);
                dispatch(CertificationActions.getCertification(id));
            })
            .finally(() => {
                return done();
            });
    }
});


export default [getCertification, saveCertification, saveField];