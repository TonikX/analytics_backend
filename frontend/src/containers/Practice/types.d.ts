import {
    ExpertiseStatus,
    PermissionsInfoFields,
    PracticeFields,
    StructuralUnitFields,
    TemplateTextPracticeFields
} from "./enum";
import {WithStyles} from "@material-ui/core";
import styles from "./Practice.styles";
import {RouteComponentProps} from "react-router-dom";
import {LiteratureType} from "../Literature/types";

export type Id = number;

export type StructuralUnitType = {
    [StructuralUnitFields.ID]: Id,
    [StructuralUnitFields.TITLE]: string,
    [StructuralUnitFields.ISU_ID]: Id,
}

export type GeneralInfoState = {
    [PracticeFields.DISCIPLINE_CODE]: string,
    [PracticeFields.TITLE]: string,
    [PracticeFields.YEAR]: number;
    [PracticeFields.AUTHORS]: string;
    [PracticeFields.OP_LEADER]: string,
    [PracticeFields.LANGUAGE]: string,
    [PracticeFields.QUALIFICATION]: string,
    [PracticeFields.KIND_OF_PRACTICE]: string,
    [PracticeFields.TYPE_OF_PRACTICE]: string,
    [PracticeFields.STRUCTURAL_UNIT]: StructuralUnitType | null,
}

export type FeaturesState = {
    [PracticeFields.WAY_OF_DOING_PRACTICE]: string,
    [PracticeFields.FORMAT_PRACTICE]: string,
    [PracticeFields.FEATURES_INTERNSHIP]: string,
    [PracticeFields.FEATURES_CONTENT_AND_INTERNSHIP]: string,
    [PracticeFields.ADDITIONAL_REPORTING_MATERIALS]: string,
}

export type AssessmentState = {
    [PracticeFields.FORM_OF_CERTIFICATION_TOOLS]: string,
    [PracticeFields.PASSED_GREAT_MARK]: string,
    [PracticeFields.PASSED_GOOD_MARK]: string,
    [PracticeFields.PASSED_SATISFACTORILY_MARK]: string,
    [PracticeFields.NOT_PASSED_MARK]: string,
}

export type ReferencesState = {
    [PracticeFields.BIBLIOGRAPHIC_REFERENCE]: Array<LiteratureType>,
}

export type TemplateTextState = {
    [TemplateTextPracticeFields.ID]: number,
    [TemplateTextPracticeFields.GENERAL_PROVISIONS]: string,
    [TemplateTextPracticeFields.STRUCTURE_AND_CONTENT]: string,
    [TemplateTextPracticeFields.REPORTING_MATERIALS]: string,
    [TemplateTextPracticeFields.OVZ]: string,
    [TemplateTextPracticeFields.EVALUATION_TOOLS_CURRENT_CONTROL]: string,
}

export type PracticeState = GeneralInfoState
    & FeaturesState
    & AssessmentState
    & ReferencesState
    & {
    [PracticeFields.ID]: Id,
    [PracticeFields.PRACTICE_BASE]: Id,
    [PracticeFields.EDITORS]: any,
    [PracticeFields.PERMISSIONS_INFO]: PermissionsInfoState,
}

export type PermissionsInfoState = {
    [PermissionsInfoFields.CAN_EDIT]: boolean,
    [PermissionsInfoFields.EXPERTISE_STATUS]: ExpertiseStatus | null,
    [PermissionsInfoFields.USE_CHAT_WITH_ID_EXPERTISE]: number | null,
    [PermissionsInfoFields.CAN_COMMENT]: boolean | null,
    [PermissionsInfoFields.CAN_APPROVE]: boolean | null,
    [PermissionsInfoFields.YOUR_APPROVE_STATUS]: any,
}

export type Validation = {
    erroredFields: PracticeFields[];
    shownErroredFields: PracticeFields[];
}

export interface practicePageState {
    isError: boolean;
    validation: Validation;
    practice: PracticeState;
    templateText: TemplateTextState;
}

export interface MinimalPracticeState {
    [PracticeFields.TITLE]: string,
    [PracticeFields.YEAR]: number,
    [PracticeFields.OP_LEADER]: string,
    [PracticeFields.AUTHORS]: string,
    [PracticeFields.FORM_OF_CERTIFICATION_TOOLS]: string,
}

export interface PracticeActions {
    getPractice: any;
    setPractice: any;
    setField: any;
    saveField: any;
    getTemplateText: any;
    setTemplateText: any;
    setError: any;
    setErroredFields: any;
    addToErroredFields: any;
    removeFromErroredFields: any;
    showErrors: any;
    showErroredField: any;
    hideErroredField: any;
    createExpertise: any;
}

export interface PracticeProps extends WithStyles<typeof styles>, RouteComponentProps {
    actions: PracticeActions;
    permissionsInfo: PermissionsInfoState;
    practice: PracticeState;
    isError: boolean;
}