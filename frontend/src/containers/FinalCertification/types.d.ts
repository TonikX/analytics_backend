import {CertificationFields, CertificationMarkFields, StructuralUnitFields} from "./enum";

export type Id = number;

export type StructuralUnitType = {
    [StructuralUnitFields.ID]: Id,
    [StructuralUnitFields.TITLE]: string,
    [StructuralUnitFields.ISU_ID]: Id,
}

export type GeneralInfoState = {
    [CertificationFields.TITLE]: string,
    [CertificationFields.YEAR]: number;
    [CertificationFields.AUTHORS]: string;
    [CertificationFields.OP_LEADER]: string,
    [CertificationFields.STRUCTURAL_UNIT]: StructuralUnitType | null,
    [CertificationFields.GENERAL_PROVISIONS_OTHER_DOCUMENTS]: string,
    [CertificationFields.DISCIPLINE_CODE]: string,
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

export type CertificationState = GeneralInfoState
    & DatesState
    & FeaturesState
    & AssessmentState
    & {
    [CertificationFields.ID]: Id,
}

export interface certificationPageState {
    certification: CertificationState,
}

export interface CertificationActions {
    getCertification: any;
    saveCertification: any;
    saveField: any;
    setCertification: any;
    setField: any;
    saveMarkCriteria: any;
    setMarkCriteria: any;
}