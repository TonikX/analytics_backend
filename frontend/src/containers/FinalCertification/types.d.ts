import {
    CertificationFields,
    CertificationMarkFields,
    StructuralUnitFields,
    TemplateTextCertificationFields
} from "./enum";
import {ExpertiseStatus, PermissionsInfoFields} from "./enum";
import {CommentFields} from "./enum";
import {UserType} from "../../layout/types";

export type Id = number;

export type StructuralUnitType = {
    [StructuralUnitFields.ID]: Id,
    [StructuralUnitFields.TITLE]: string,
    [StructuralUnitFields.ISU_ID]: Id,
}

export type MainInfoState = {
    [CertificationFields.DISCIPLINE_CODE]: string,
    [CertificationFields.TITLE]: string,
    [CertificationFields.YEAR]: number;
    [CertificationFields.AUTHORS]: string;
    [CertificationFields.OP_LEADER]: string,
    [CertificationFields.STRUCTURAL_UNIT]: StructuralUnitType | null,
    [CertificationFields.SEMESTER_COUNT]: number,
    [CertificationFields.QUALIFICATION]: string,
    [CertificationFields.ZE_V_SEM]: string,
    [CertificationFields.EVALUATION_TOOLS]: number[][],
}

export type GeneralProvisionsState = {
    [CertificationFields.GENERAL_PROVISIONS_OTHER_DOCUMENTS]: string,
}

export type DatesState = {
    [CertificationFields.FILLING_AND_APPROVAL_TIME]: string,
    [CertificationFields.WORK_ON_VKR_CONTENT_TIME]: string,
    [CertificationFields.PRE_DEFENCE_TIME]: string,
    [CertificationFields.ANTI_PLAGIARISM_ANALYSIS_TIME]: string,
}

export type FeaturesState = {
    [CertificationFields.PRELIMINARY_DEFENSE]: string,
    [CertificationFields.ANTI_PLAGIARISM]: string,
    [CertificationFields.STRUCTURE_ELEMENTS_OPTIONAL]: string,
    [CertificationFields.OPTIONAL_DESIGN_REQUIREMENTS]: string,
    [CertificationFields.CONTENT_REQUIREMENTS]: string,
    [CertificationFields.DEFENCE_PRESENTATION_REQUIREMENTS]: string,
}


export type CertificationMark = {
    [CertificationMarkFields.ID]: Id,
    [CertificationMarkFields.GREAT]: string,
    [CertificationMarkFields.GOOD]: string,
    [CertificationMarkFields.SATISFACTORILY]: string,
    [CertificationMarkFields.UNSATISFACTORY]: string,
} | null;

export type AssessmentState = {
    [CertificationFields.CONTENT_CORRESPONDENCE_MARKS]: CertificationMark,
    [CertificationFields.RELEVANCE_MARKS]: CertificationMark,
    [CertificationFields.SPECIALIZATION_CORRESPONDENCE_MARKS]: CertificationMark,
    [CertificationFields.CORRECTNESS_OF_METHODS_MARKS]: CertificationMark,
    [CertificationFields.QUALITY_AND_LOGIC_MARKS]: CertificationMark,
    [CertificationFields.VALIDITY_MARKS]: CertificationMark,
    [CertificationFields.SIGNIFICANCE_MARKS]: CertificationMark,
    [CertificationFields.IMPLEMENTATION_MARKS]: CertificationMark,
    [CertificationFields.REPORT_QUALITY_MARKS]: CertificationMark,
    [CertificationFields.PRESENTATION_QUALITY_MARKS]: CertificationMark,
    [CertificationFields.ANSWERS_QUALITY_MARKS]: CertificationMark,
}

export type TemplateTextState = {
    [TemplateTextCertificationFields.ID]: number,
    [TemplateTextCertificationFields.GIA_COMPONENTS]: string,
    [TemplateTextCertificationFields.GENERAL_PROVISIONS]: string,
    [TemplateTextCertificationFields.VKR_THEME_CHOICE_TIME]: string,
    [TemplateTextCertificationFields.CORRECTION_THEME_TIME]: string,
    [TemplateTextCertificationFields.UPLOAD_TO_ISU_TIME]: string,
    [TemplateTextCertificationFields.MANAGER_FEEDBACK_TIME]: string,
    [TemplateTextCertificationFields.MANAGER_FEEDBACK_ACCEPTION_TIME]: string,
    [TemplateTextCertificationFields.PRESENTATION_OF_MATERIALS_TIME]: string,
    [TemplateTextCertificationFields.VKR_DEFENCE_TIME]: string,
    [TemplateTextCertificationFields.STRUCTURE_ELEMENTS]: string,
    [TemplateTextCertificationFields.VKR_MARK]: string,
    [TemplateTextCertificationFields.GIA_OVZ]: string,
    [TemplateTextCertificationFields.TEMPLATE_YEAR]: number,
    [TemplateTextCertificationFields.PROFESSIONAL_PROBLEMS_MARKS]: CertificationMark,
}

export type CertificationState = MainInfoState
    & GeneralProvisionsState
    & DatesState
    & FeaturesState
    & AssessmentState
    & {
    [CertificationFields.ID]: Id,
    [CertificationFields.GIA_BASE]: Id,
    [CertificationFields.EDITORS]: any,
    [CertificationFields.PERMISSIONS_INFO]: PermissionsInfoState,
    [CertificationFields.EDITORS]: Array<UserType>;
}

export type CommentType = {
    [CommentFields.DATE]: string;
    [CommentFields.TEXT]: string;
    [CommentFields.ID]: number;
    [CommentFields.USER_EXPERTISE]: {
        [CommentFields.EXPERT]: UserType
    };
}

export type Validation = {
    erroredFields: CertificationFields[];
    shownErroredFields: CertificationFields[];
}

export interface certificationPageState {
    isError: boolean;
    validation: Validation;
    certification: CertificationState;
    templateText: TemplateTextState;
    comments: Array<CommentType>;
}

export type PermissionsInfoState = {
    [PermissionsInfoFields.CAN_EDIT]: boolean,
    [PermissionsInfoFields.EXPERTISE_STATUS]: ExpertiseStatus | null,
    [PermissionsInfoFields.USE_CHAT_WITH_ID_EXPERTISE]: number | null,
    [PermissionsInfoFields.CAN_COMMENT]: boolean | null,
    [PermissionsInfoFields.CAN_APPROVE]: boolean | null,
    [PermissionsInfoFields.YOUR_APPROVE_STATUS]: ExpertiseStatus | null,
    [PermissionsInfoFields.USER_EXPERTISE_ID]: number | null,
}

export interface CertificationActions {
    getCertification: any;
    saveField: any;
    setCertification: any;
    setField: any;
    saveMarkCriteria: any;
    setMarkCriteria: any;
    getTemplateText: any;
    setTemplateText: any,
    setError: any;
    setErroredFields: any;
    addToErroredFields: any;
    removeFromErroredFields: any;
    showErrors: any;
    showErroredField: any;
    hideErroredField: any;
    createExpertise: any;
    approveCertification: any;
    sendCertificationToRework: any;
    getComments: any;
    setComments: any;
    sendComment: any;
}
