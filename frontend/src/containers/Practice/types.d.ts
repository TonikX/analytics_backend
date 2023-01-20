import {
    CommentFields, DialogType,
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
import {UserType} from "../../layout/types";
import {Zun} from "../EducationalProgram/Characteristic/CompetenceMatrix/types";
import {PrerequisiteType, ResultsType} from "../WorkProgram/types";
import {DirectionType} from "../Direction/types";

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
    [PracticeFields.SEMESTER_COUNT]: number,
    [PracticeFields.EDITORS]: any,
    [PracticeFields.PERMISSIONS_INFO]: PermissionsInfoState,
    [PracticeFields.ZE_V_SEM]: string,
    [PracticeFields.EVALUATION_TOOLS]: number[][]
    [PracticeFields.PRAC_ISU_ID]: number | null
    [PracticeFields.PREREQUISITES]: PrerequisiteType[]
    [PracticeFields.COMPETENCES]: Competence[];
    [PracticeFields.OUTCOMES]: ResultsType[];
    [PracticeFields.EDITORS]: Array<UserType>;
}

interface Competence {
    id: number;
    number: string;
    name: string;
    zuns: Zun[]
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

export type Validation = {
    erroredFields: PracticeFields[];
    shownErroredFields: PracticeFields[];
}

export interface practicePageState {
    isError: boolean;
    validation: Validation;
    practice: PracticeState;
    templateText: TemplateTextState;
    comments: Array<CommentType>;
    dialog: {
        [DialogType.PREREQUISITES]: {
            isOpen: boolean,
            dialogData: PrerequisiteType
        },
        [DialogType.RESULTS]: {
            isOpen: boolean,
            dialogData: PrerequisiteType
        }
    };
    dependentDirections: Array<DirectionType>
}

export interface MinimalPracticeState {
    [PracticeFields.TITLE]: string,
    [PracticeFields.YEAR]: number,
    [PracticeFields.SEMESTER_COUNT]: number,
    [PracticeFields.FORM_OF_CERTIFICATION_TOOLS]: string,
    [PracticeFields.QUALIFICATION]: string,
    [PracticeFields.ZE_V_SEM]: string;
    [PracticeFields.STRUCTURAL_UNIT]: string;
    [PracticeFields.EVALUATION_TOOLS]: number[][];
}

export type CommentType = {
    [CommentFields.DATE]: string;
    [CommentFields.TEXT]: string;
    [CommentFields.ID]: number;
    [CommentFields.USER_EXPERTISE]: {
        [CommentFields.EXPERT]: UserType
    };
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
    approvePractice: any;
    sendPracticeToRework: any;
    getComments: any;
    setComments: any;
    sendComment: any;

    openDialog: any;
    closeDialog: any;

    deletePrerequisite: any;
    addPrerequisite: any;
    changePrerequisite: any;

    getResults: any;
    deleteZUN: any;
    saveZUN: any;

    deleteResult: any;
    changeResult: any;
    addResult: any;

    getCompetencesDependedOnPractice: any;
    setCompetencesDependedOnPractice: any;
}

export interface PracticeProps extends WithStyles<typeof styles>, RouteComponentProps {
    actions: PracticeActions;
    permissionsInfo: PermissionsInfoState;
    practice: PracticeState;
    isError: boolean;
    comments: Array<CommentType>;
}
