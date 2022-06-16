import {createAction} from "@reduxjs/toolkit";
import {CertificationActions} from "./types";

const getCertification = createAction('GET_CERTIFICATION');
const saveField = createAction('SAVE_CERTIFICATION_FIELD');
const setCertification = createAction('SET_CERTIFICATION');
const setField = createAction('SET_FIELD');
const saveMarkCriteria = createAction('SAVE_MARK_CRITERIA');
const setMarkCriteria = createAction('SET_MARK_CRITERIA');
const getTemplateText = createAction('GET_TEMPLATE_TEXT');
const setTemplateText = createAction('SET_TEMPLATE_TEXT');
const setError = createAction('CERTIFICATION_SET_ERROR');
const setErroredFields = createAction('CERTIFICATION_SET_ERRORED_FIELDS');
const addToErroredFields = createAction('CERTIFICATION_ADD_TO_ERRORED_FIELDS');
const removeFromErroredFields = createAction('CERTIFICATION_REMOVE_FROM_ERRORED_FIELDS');
const showErrors = createAction('CERTIFICATION_SHOW_ERRORS');
const showErroredField = createAction('CERTIFICATION_SHOW_ERRORED_FIELD');
const hideErroredField = createAction('CERTIFICATION_HIDE_ERRORED_FIELD');
const createExpertise = createAction('CERTIFICATION_CREATE_EXPERTISE');
const approveCertification = createAction('APPROVE_CERTIFICATION');
const sendCertificationToRework = createAction('SEND_CERTIFICATION_TO_REWORK');
const getComments = createAction('GET_COMMENTS_CERTIFICATION');
const setComments = createAction('SET_COMMENTS_CERTIFICATION');
const sendComment = createAction('SEND_COMMENT_CERTIFICATION');

export const actions: CertificationActions = {
    getCertification,
    saveField,
    setCertification,
    setField,
    saveMarkCriteria,
    setMarkCriteria,
    getTemplateText,
    setTemplateText,
    setError,
    setErroredFields,
    addToErroredFields,
    removeFromErroredFields,
    showErrors,
    showErroredField,
    hideErroredField,
    createExpertise,
    approveCertification,
    sendCertificationToRework,
    getComments,
    setComments,
    sendComment,
}

export default actions;
