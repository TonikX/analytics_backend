import {WorkProgramGeneralFields} from '../WorkProgram/enum';
import {WorkProgramGeneralType} from "../WorkProgram/types";

export type WorkProgram = {
    [WorkProgramGeneralFields.ID]: number;
    [WorkProgramGeneralFields.TITLE]: string;
    [WorkProgramGeneralFields.CODE]: string;
    [WorkProgramGeneralFields.QUALIFICATION]: string;
    [WorkProgramGeneralFields.APPROVAL_DATE]: string;
    [WorkProgramGeneralFields.AUTHORS]: string;
};

export type WorkProgramList = {
    workPrograms: Array<WorkProgramGeneralType>
}
