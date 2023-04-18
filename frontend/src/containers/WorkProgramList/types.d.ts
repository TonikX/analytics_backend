import {fields, filterFields} from './enum';
import {WithStyles} from '@mui/styles';
import styles from "./WorkProgram.styles";
import {WorkProgramActions, WorkProgramGeneralType} from '../WorkProgram/types';
import {SortingType} from "../../components/SortingButton/types";
import {getShowArchive} from "./getters";
import {WorkProgramStatusEnum} from "../WorkProgram/enum";

export interface WorkProgramListActions {
    setWorkProgramIdForRedirect: any;
    pageDown: any;
    changeSearchQuery: any;
    getWorkProgramList: any;
    setWorkProgramList: any;
    createNewWorkProgram: any;
    changeWorkProgram: any;
    deleteWorkProgram: any;
    openDialog: any;
    closeDialog: any;
    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
    changeFiltering: any;
}

export interface workProgramListState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.FILTERING]: any;
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.WORK_PROGRAM_ID_FOR_REDIRECT]: number|null;
    [fields.WORK_PROGRAM_LIST]: Array<WorkProgramGeneralType>;
    [fields.WORK_PROGRAM_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: WorkProgramGeneralType|{};
    };
}

export type FiltersType = {
    [filterFields.NUMBER_OP]: string;
    [filterFields.NAME_OP]: string;
    [filterFields.SPECIALIZATION]: string;
    [filterFields.LANGUAGE]: string;
    [filterFields.STRUCTURAL_UNIT]: number|'';
}

export interface WorkProgramListProps extends WithStyles<typeof styles> {
    actions: WorkProgramListActions;
    workProgramActions: WorkProgramActions;
    workProgramList: Array<WorkProgramGeneralType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    showOnlyMy: boolean;
    showArchive: boolean;
    workProgramIdForRedirect: number|null;
    sortingMode: SortingType;
    status: WorkProgramStatusEnum|null;
    classes: any;
}
