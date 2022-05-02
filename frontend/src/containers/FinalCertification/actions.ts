import {createAction} from "@reduxjs/toolkit";
import {CertificationActions} from "./types";

const getCertification = createAction('GET_CERTIFICATION');
const saveCertification = createAction('SAVE_CERTIFICATION');
const saveField = createAction('SAVE_CERTIFICATION_FIELD');
const setCertification = createAction('SET_CERTIFICATION');

export const actions: CertificationActions = {
    getCertification,
    saveCertification,
    saveField,
    setCertification,
}

export default actions;
