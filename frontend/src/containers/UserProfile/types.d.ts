import {WorkProgramGeneralFields} from '../WorkProgram/enum';
import {WorkProgramGeneralType} from "../WorkProgram/types";
import {WithStyles} from "@material-ui/core";
import styles from "../DodProfile/DodProfile.styles";

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