import {createAction} from "@reduxjs/toolkit";
import {CertificationActions} from "./types";

const getCertification = createAction('GET_CERTIFICATION');
const saveCertification = createAction('SAVE_CERTIFICATION');
const saveField = createAction('SAVE_CERTIFICATION_FIELD');
const setCertification = createAction('SET_CERTIFICATION');
const setField = createAction('SET_FIELD');

export const actions: CertificationActions = {
    getCertification,
    saveCertification,
    saveField,
    setCertification,
    setField
}

export default actions;
