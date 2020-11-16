import {
    fields,
    PrerequisiteFields,
    EvaluationToolFields,
    ResultsFields,
    WorkProgramGeneralFields,
    WorkProgramStatusEnum, CommentFields
} from './enum';
import {WithStyles} from "@material-ui/core";
import styles from "./WorkProgram.styles";
import {CourseType} from "../Courses/types";
import {TrainingEntitityType} from "../TrainingEntities/types";
import {IndicatorsFields} from "../Indicators/enum";
import {CompetenceFields} from "../Competences/enum";
import {UserType} from "../../layout/types";
import {FolderActions, FolderType} from "../Profile/Folders/types";

export interface WorkProgramActions {
    pageDown: any;

    sendWorkProgramToArchive: any;
    sendWorkProgramToExpertise: any;
    returnWorkProgramToWork: any;
    approveWorkProgram: any;

    deleteResult: any;
    addResult: any;
    changeResult: any;
    setResults: any;
    getResults: any;

    cloneWorkProgram: any;

    getWorkProgram: any;
    setWorkProgram: any;
    setWorkProgramPart: any;
    saveWorkProgram: any;
    setWorkProgramId: any;

    deleteSection: any;
    saveSection: any;
    changeSectionNumber: any;

    saveTopic: any;
    deleteTopic: any;
    changeTopicNumber: any;

    deleteLiterature: any;
    addLiterature: any;

    deletePrerequisite: any;
    addPrerequisite: any;
    changePrerequisite: any;

    openDialog: any;
    closeDialog: any;

    getWorkProgramEvaluationTools: any;
    setWorkProgramEvaluationTools: any;

    deleteEvaluationTool: any;
    addEvaluationTool: any;
    changeEvaluationTool: any;

    getComments: any;
    setComments: any;
    createComment: any;
}

export interface workProgramState {
    [fields.WORK_PROGRAM]: any;
    [fields.WORK_PROGRAM_ID]: string;
    [fields.WORK_PROGRAM_EVALUATION_TOOLS]: Array<any>;
    [fields.WORK_PROGRAM_RESULTS]: Array<any>;
    [fields.DIALOGS]: {};
    [fields.WORK_PROGRAM_COMMENTS]: Array<any>; //todo: change type
}

export type WorkProgramGeneralType = {
    [WorkProgramGeneralFields.ID]: number;
    [WorkProgramGeneralFields.TITLE]: string;
    [WorkProgramGeneralFields.CODE]: string;
    [WorkProgramGeneralFields.QUALIFICATION]: string;
    [WorkProgramGeneralFields.APPROVAL_DATE]: string;
    [WorkProgramGeneralFields.AUTHORS]: string;
    [WorkProgramGeneralFields.ZUN]: Array<ZunType>;
};

export type ZunType = {
    'zun_in_wp': {
        "indicator_in_zun": {
            "id": 1,
            "number": "ПКС-1.1.1",
            "name": "Разрабатывает технико-коммерческое предложение и участвует  в его защите",
            "competence": {
                "id": 1,
                "number": "ПКС-1.1",
                "name": "Способен управлять аналитическими работами и работать со сложными структурами данных при решении практических задач программирования"
            }
        },
    }
};

export type IndicatorInZun = {
    [IndicatorsFields.ID]: number;
    [IndicatorsFields.NUMBER]: string;
    [IndicatorsFields.NAME]: string;
    "competence": {
        [CompetenceFields.ID]: number;
        [CompetenceFields.NUMBER]: string;
        [CompetenceFields.NAME]: string;
    }
}

export interface WorkProgramProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    foldersActions: FolderActions;
    workProgramTitle: string;
    canApprove: boolean;
    canSendToExpertise: boolean;
    canSendToArchive: boolean;
    canComment: boolean;
    workProgramStatus: string;
    folders: Array<FolderType>
}

export type Section = {
    id: number;
    ordinal_number: number;
    name: string;
    SRO: number;
    contact_work: number;
    lecture_classes: number;
    practical_lessons: number;
    total_hours: number;
    laboratory: number;
    topics: Array<Topic>;
};

export type Topic = {
    description: string;
    online_course: string;
    url_online_course: CourseType;
    discipline_section: string;
    number: string;
    id: string;
}


export type PrerequisiteType = {
    [PrerequisiteFields.ID]: number;
    [PrerequisiteFields.MASTER_LEVEL]: string;
    [PrerequisiteFields.ITEM]: TrainingEntitityType;
}

export type ResultsType = {
    [ResultsFields.ID]: number;
    [ResultsFields.MASTER_LEVEL]: string;
    [ResultsFields.ITEM]: TrainingEntitityType;
    [ResultsFields.EVALUATION_TOOLS]: Array<EvaluationToolType>;
}

export type EvaluationToolType = {
    [EvaluationToolFields.ID]: number;
    [EvaluationToolFields.NAME]: string;
    [EvaluationToolFields.DESCRIPTION]: string;
    [EvaluationToolFields.TYPE]: string;
    [EvaluationToolFields.MIN]: number;
    [EvaluationToolFields.DEADLINE]: number;
    [EvaluationToolFields.CHECK_POINT]: true | null;
    [EvaluationToolFields.MAX]: number;
    [EvaluationToolFields.SEMESTER]: number;
    [EvaluationToolFields.SECTIONS]: Array<Section>;
}

export type WorkProgramStatusType =
    WorkProgramStatusEnum.AT_WORK |
    WorkProgramStatusEnum.EXPERTISE |
    WorkProgramStatusEnum.APPROVE |
    WorkProgramStatusEnum.ARCHIVE
;

export type CommentType = {
    [CommentFields.DATE]: string;
    [CommentFields.TEXT]: string;
    [CommentFields.ID]: number;
    [CommentFields.USER_EXPERTISE]: {
        [CommentFields.EXPERT]: UserType
    };
}