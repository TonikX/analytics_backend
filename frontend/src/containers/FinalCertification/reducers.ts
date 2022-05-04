import {certificationPageState} from "./types";
import {CertificationFields} from "./enum";
import createReducer from "../../store/createReducer";
import actions from "./actions";

export const GENERAL_PATH = 'certification';

export const initialState: certificationPageState = {
    certification: {
        [CertificationFields.ID]: 1,
        [CertificationFields.TITLE]: '',
        [CertificationFields.YEAR]: 0,
        [CertificationFields.AUTHORS]: '',
        [CertificationFields.OP_LEADER]: '',
        [CertificationFields.STRUCTURAL_UNIT]: null,
        [CertificationFields.GENERAL_PROVISIONS_OTHER_DOCUMENTS]: '',
        [CertificationFields.FILLING_AND_APPROVAL_TIME]: '',
        [CertificationFields.WORK_ON_VKR_CONTENT_TIME]: '',
        [CertificationFields.PRE_DEFENCE_TIME]: '',
        [CertificationFields.ANTI_PLAGIARISM_ANALYSIS_TIME]: '',
        [CertificationFields.PRELIMINARY_DEFENSE]: '',
        [CertificationFields.ANTI_PLAGIARISM]: '',
        [CertificationFields.STRUCTURE_ELEMENTS_OPTIONAL]: '',
        [CertificationFields.OPTIONAL_DESIGN_REQUIREMENTS]: '',
        [CertificationFields.CONTENT_REQUIREMENTS]: '',
        [CertificationFields.DEFENCE_PRESENTATION_REQUIREMENTS]: '',
        [CertificationFields.CONTENT_CORRESPONDENCE_MARKS]: null,
        [CertificationFields.RELEVANCE_MARKS]: null,
        [CertificationFields.SPECIALIZATION_CORRESPONDENCE_MARKS]: null,
        [CertificationFields.CORRECTNESS_OF_METHODS_MARKS]: null,
        [CertificationFields.QUALITY_AND_LOGIC_MARKS]: null,
        [CertificationFields.VALIDITY_MARKS]: null,
        [CertificationFields.SIGNIFICANCE_MARKS]: null,
        [CertificationFields.SIGNIFICANCE_MARKS]: null,
        [CertificationFields.IMPLEMENTATION_MARKS]: null,
        [CertificationFields.REPORT_QUALITY_MARKS]: null,
        [CertificationFields.PRESENTATION_QUALITY_MARKS]: null,
        [CertificationFields.ANSWERS_QUALITY_MARKS]: null,
    }
}

const setCertification = (state: certificationPageState, {payload}: any): certificationPageState => ({
    ...state,
    certification: {
        ...state?.certification,
        ...payload,
    }
});

const setField = (state: certificationPageState, {payload}: any): certificationPageState => ({
    ...state,
    certification: {
        ...state?.certification,
        [payload.field]: payload.value,
    }
});

export const reducer = createReducer(initialState, {
    [actions.setCertification.type]: setCertification,
    [actions.setField.type]: setField,
});