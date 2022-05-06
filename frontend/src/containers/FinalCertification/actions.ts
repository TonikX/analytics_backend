import {createAction} from "@reduxjs/toolkit";
import {CertificationActions} from "./types";

const getCertification = createAction('GET_CERTIFICATION');
const saveCertification = createAction('SAVE_CERTIFICATION');
const saveField = createAction('SAVE_CERTIFICATION_FIELD');
const setCertification = createAction('SET_CERTIFICATION');
const setField = createAction('SET_FIELD');
const saveMarkCriteria = createAction('SAVE_MARK_CRITERIA');
const setMarkCriteria = createAction('SET_MARK_CRITERIA');
const getTemplateText = createAction('GET_TEMPLATE_TEXT');
const setTemplateText = createAction('SET_TEMPLATE_TEXT');

export const actions: CertificationActions = {
    getCertification,
    saveCertification,
    saveField,
    setCertification,
    setField,
    saveMarkCriteria,
    setMarkCriteria,
    getTemplateText,
    setTemplateText,
}

export default actions;
