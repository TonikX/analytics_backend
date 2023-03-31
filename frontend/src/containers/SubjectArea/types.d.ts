import {fields} from './enum';
import {WithStyles} from "@mui/material";
import styles from "./WorkProgram.styles";
import {SubjectAreaFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";

export interface SubjectAreaActions {
    changeSearchQuery: any;
    getSubjectArea: any;
    setSubjectArea: any;
    createNewSubjectArea: any;
    changeSubjectArea: any;
    deleteSubjectArea: any;
    openDialog: any;
    closeDialog: any;
    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
}

export interface subjectAreaState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.SUBJECT_AREA_LIST]: Array<SubjectAreaType>;
    [fields.SUBJECT_AREA_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: SubjectAreaType|{};
    };
}

export type SubjectAreaType = {
    [SubjectAreaFields.ID]: number,
    [SubjectAreaFields.TITLE]: string,
};

export interface SubjectAreaProps extends WithStyles<typeof styles> {
    actions: SubjectAreaActions;
    subjectArea: Array<SubjectAreaType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
}