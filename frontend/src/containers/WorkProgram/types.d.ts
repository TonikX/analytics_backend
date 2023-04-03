import {
    EvaluationToolFields,
    fields,
    ImplementationFormatsEnum,
    PrerequisiteFields,
    ResultsFields,
    WorkProgramGeneralFields,
    WorkProgramStatusEnum
} from './enum';
import {WithStyles} from '@mui/styles';
import styles from "./WorkProgram.styles";
import {CourseType} from "../Courses/types";
import {TrainingEntitityType} from "../TrainingEntities/types";
import {FolderActions, FolderType} from "../Profile/Folders/types";
import {CommentType} from "../../components/Comments/types";


export interface WorkProgramActions {
    pageDown: any;

    saveZUN: any;
    deleteZUN: any;
    updateZUN: any;

    sendWorkProgramToArchive: any;
    sendWorkProgramToExpertise: any;
    sendWorkProgramToIsu: any;
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
    getWorkProgramEvaluationTool: any;
    setWorkProgramEvaluationTool: any;

    deleteIntermediateCertification: any;
    addIntermediateCertification: any;
    changeIntermediateCertification: any;
    getIntermediateCertification: any;
    setIntermediateCertification: any;

    getComments: any;
    setComments: any;
    createComment: any;
    updateUnreadCommentStatus: any;

    addTopicMaterial: any;
    updateTopicMaterial: any;
    deleteTopicMaterial: any;
}

export interface workProgramState {
    [fields.WORK_PROGRAM]: any;
    [fields.WORK_PROGRAM_EVALUATION_TOOLS]: Array<EvaluationToolType>;
    [fields.WORK_PROGRAM_EVALUATION_TOOL]: EvaluationToolType|{};
    [fields.WORK_PROGRAM_INTERMEDIATE_CERTIFICATION_TOOL]: IntermediateCertificationType|{};
    [fields.WORK_PROGRAM_INTERMEDIATE_CERTIFICATION_TOOLS]: Array<IntermediateCertificationType>;
    [fields.WORK_PROGRAM_RESULTS]: Array<any>;
    [fields.DIALOGS]: {};
    [fields.WORK_PROGRAM_COMMENTS]: Array<any>; //todo: change type
}

export type WorkProgramGeneralType = {
    [WorkProgramGeneralFields.ID]: number;
    [WorkProgramGeneralFields.DISCIPLINE_CODE]: number;
    [WorkProgramGeneralFields.TITLE]: string;
    [WorkProgramGeneralFields.DESCRIPTION]: string;
    [WorkProgramGeneralFields.CODE]: string;
    [WorkProgramGeneralFields.QUALIFICATION]: string;
    [WorkProgramGeneralFields.APPROVAL_DATE]: string;
    [WorkProgramGeneralFields.AUTHORS]: string;
    [WorkProgramGeneralFields.RATING]: boolean;
    [WorkProgramGeneralFields.ZUN]: Array<ZunType>;
    [WorkProgramGeneralFields.BARS]: boolean;
    [WorkProgramGeneralFields.IMPLEMENTATION_FORMAT]: ImplementationFormatsEnum;
};

export type ZunType = {
    'zun_in_wp': {
        "indicator_in_zun": {
            "id": number,
            "number": string,
            "name": string,
            "competence": {
                "id": number,
                "number": string,
                "name": string
            }
        },
    }
};

export interface WorkProgramProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    foldersActions: FolderActions;
    workProgramTitle: string;
    canApprove: boolean;
    canSendToExpertise: boolean;
    canSendToArchive: boolean;
    canAddToFolder: boolean;
    canSendToIsu: boolean;
    canComment: boolean;
    workProgramStatus: string;
    workProgramRating: boolean;
    workProgramRatingId: number;
    folders: Array<FolderType>
    workProgram: WorkProgramGeneralType;
    validateErrors: Array<string>;
    fetchingBars: boolean;
    location: any;
    notificationsRead: Array<boolean>,
    comments: Array<CommentType>,
}


export type SectionType = {
    id: number;
    ordinal_number: number;
    name: string;
    SRO: number;
    contact_work: number;
    lecture_classes: number;
    practical_lessons: number;
    consultations: number;
    total_hours: number;
    laboratory: number;
    topics: Array<TopicType>;
};

export type TopicType = {
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
    [EvaluationToolFields.SEMESTER]: string;
    [EvaluationToolFields.SECTIONS]: Array<SectionType>;
}

export type IntermediateCertificationType = {
    [EvaluationToolFields.ID]: number;
    [EvaluationToolFields.NAME]: string;
    [EvaluationToolFields.DESCRIPTION]: string;
    [EvaluationToolFields.TYPE]: string;
    [EvaluationToolFields.MIN]: number;
    [EvaluationToolFields.MAX]: number;
    [EvaluationToolFields.SEMESTER]: string;
}

export type WorkProgramStatusType =
    WorkProgramStatusEnum.AT_WORK |
    WorkProgramStatusEnum.EXPERTISE |
    WorkProgramStatusEnum.APPROVE |
    WorkProgramStatusEnum.ARCHIVE
;