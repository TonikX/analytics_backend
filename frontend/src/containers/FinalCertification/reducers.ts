import {certificationPageState} from "./types";
import {CertificationFields, CertificationMarkFields, TemplateTextCertificationFields} from "./enum";
import createReducer from "../../store/createReducer";
import actions from "./actions";

export const GENERAL_PATH = 'certification';

export const initialState: certificationPageState = {
    isError: false,
    certification: {
        [CertificationFields.ID]: 1,
        [CertificationFields.DISCIPLINE_CODE]: '',
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
        [CertificationFields.GIA_BASE]: 1,
        [CertificationFields.EDITORS]: [],
    },
    templateText: {
        [TemplateTextCertificationFields.ID]: 1,
        [TemplateTextCertificationFields.GIA_COMPONENTS]: '',
        [TemplateTextCertificationFields.GENERAL_PROVISIONS]: '',
        [TemplateTextCertificationFields.VKR_THEME_CHOICE_TIME]: '',
        [TemplateTextCertificationFields.CORRECTION_THEME_TIME]: '',
        [TemplateTextCertificationFields.UPLOAD_TO_ISU_TIME]: '',
        [TemplateTextCertificationFields.MANAGER_FEEDBACK_TIME]: '',
        [TemplateTextCertificationFields.MANAGER_FEEDBACK_ACCEPTION_TIME]: '',
        [TemplateTextCertificationFields.PRESENTATION_OF_MATERIALS_TIME]: '',
        [TemplateTextCertificationFields.VKR_DEFENCE_TIME]: '',
        [TemplateTextCertificationFields.STRUCTURE_ELEMENTS]: '',
        [TemplateTextCertificationFields.VKR_MARK]: '',
        [TemplateTextCertificationFields.GIA_OVZ]: '',
        [TemplateTextCertificationFields.TEMPLATE_YEAR]: 0,
        [TemplateTextCertificationFields.PROFESSIONAL_PROBLEMS_MARKS]: {
            [CertificationMarkFields.ID]: 1,
            [CertificationMarkFields.GREAT]: '',
            [CertificationMarkFields.GOOD]: '',
            [CertificationMarkFields.SATISFACTORILY]: '',
            [CertificationMarkFields.UNSATISFACTORY]: '',
        },
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

type SetMarkCriteriaArgs = {
    field: CertificationFields,
    markType: CertificationMarkFields,
    value: string,
}

const setMarkCriteria = (state: certificationPageState, {payload}: any): certificationPageState => {

    const {field, markType, value}: SetMarkCriteriaArgs = payload;

    const mark = state?.certification[field] as any;

    return {
        ...state,
        certification: {
            ...state?.certification,
            [field]: {
                ...mark,
                [markType]: value,
            },
        }
    }
};

const setTemplateText = (state: certificationPageState, {payload}: any): certificationPageState => ({
    ...state,
    templateText: {
        ...state?.templateText,
        ...payload,
    }
});

const setError = (state: certificationPageState, {payload}: any): certificationPageState => ({
    ...state,
    isError: payload,
});

export const reducer = createReducer(initialState, {
    [actions.setCertification.type]: setCertification,
    [actions.setField.type]: setField,
    [actions.setMarkCriteria.type]: setMarkCriteria,
    [actions.setTemplateText.type]: setTemplateText,
    [actions.setError.type]: setError,
});