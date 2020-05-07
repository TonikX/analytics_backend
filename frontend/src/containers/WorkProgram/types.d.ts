import {fields} from './enum';

export interface WorkProgramActions {
    getWorkProgram: any;
    setWorkProgram: any;
    setWorkProgramPart: any;
    saveWorkProgram: any;
    setWorkProgramId: any;
    deleteSection: any;
    saveSection: any;
    changeSectionNumber: any;
}

export interface workProgramState {
    [fields.WORK_PROGRAM]: any;
    [fields.WORK_PROGRAM_ID]: string;
}

export interface WorkProgramProps {
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
    number: string;
    id: string;
}