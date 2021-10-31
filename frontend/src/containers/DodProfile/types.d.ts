import {WithStyles} from "@material-ui/core";
import styles from "./DodProfile.styles";

export interface dodProfileState {
    workProgramList: Array,
    allCount: number,
    currentPage: number,
    tableMode: number,
}

export interface dodProfileActions {
    getDodWorkProgramsList: any,
    setDodWorkProgramsList: any,
    changeAllCount: any,
    changeCurrentPage: any,
    changeTableMode: any
}

export interface dodProfileProps extends WithStyles<typeof styles>{
    actions: dodProfileActions;
    workProgramList: any;
    currentPage: number;
    allCount: number;
    tableMode:number;
}