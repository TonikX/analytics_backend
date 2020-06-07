import {fields, PrerequisiteFields} from './enum';
import {WithStyles} from "@material-ui/core";
import styles from "./WorkProgram.styles";
import {CourseType} from "../Courses/types";
import {TrainingEntitityType} from "../TrainingEntities/types";

export interface WorkProgramActions {
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
}

export interface workProgramState {
    [fields.WORK_PROGRAM]: any;
    [fields.WORK_PROGRAM_ID]: string;
    [fields.DIALOGS]: {
        [fields.CREATE_NEW_TOPIC_DIALOG]: {

        }
    };
}

export interface WorkProgramProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
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