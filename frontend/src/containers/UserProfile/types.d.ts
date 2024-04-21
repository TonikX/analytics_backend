import {WorkProgramGeneralFields} from '../WorkProgram/enum';

export interface userProfileState {
    workProgramList: Array,
    allCount: number,
    currentPage: number,
}

export interface userProfileActions {
    getUserWorkProgramsList: any,
    setUserWorkProgramsList: any,
    changeAllCount: any,
    changeCurrentPage: any
}

export type WorkProgram = {
    [WorkProgramGeneralFields.ID]: number;
    [WorkProgramGeneralFields.TITLE]: string;
    [WorkProgramGeneralFields.CODE]: string;
    [WorkProgramGeneralFields.QUALIFICATION]: string;
    [WorkProgramGeneralFields.APPROVAL_DATE]: string;
    [WorkProgramGeneralFields.AUTHORS]: string;
};
