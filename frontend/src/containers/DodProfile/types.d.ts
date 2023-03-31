import {WithStyles} from "@mui/material";
import styles from "./DodProfile.styles";

export interface dodProfileState {
    workProgramList: Array,
    allCount: number,
    currentPage: number,
    tableMode: number,
    userName: any,
    userGroups: Array,
}

export interface dodProfileActions {
    getDodWorkProgramsList: any,
    setDodWorkProgramsList: any,
    changeAllCount: any,
    changeCurrentPage: any,
    changeTableMode: any,
    getUserName: any,
    setUserName: any,
    getUserGroups: any,
    setUserGroups: any
}

export interface dodProfileProps extends WithStyles<typeof styles>{
    actions: dodProfileActions;
    workProgramList: any;
    currentPage: number;
    allCount: number;
    tableMode:number;
    userName: any;
    userGroups: Array;
}