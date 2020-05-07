import {fields} from './enum';

export interface WorkProgramActions {
    getWorkProgram: any;
    setWorkProgram: any;
    saveWorkProgram: any;
    setWorkProgramId: any;
    deleteSection: any;
    saveSection: any;
}

export interface workProgramState {
    [fields.WORK_PROGRAM]: any;
    [fields.WORK_PROGRAM_ID]: string;
}

export interface WorkProgramProps {
    actions: WorkProgramActions;
}