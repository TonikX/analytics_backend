import {fields} from './enum';
import {WithStyles} from '@mui/styles';
import styles from "./WorkProgram.styles";
import {DirectionFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";

export interface DirectionActions {
    changeSearchQuery: any;
    getDirections: any;
    setDirections: any;
    createNewDirection: any;
    changeDirection: any;
    deleteDirection: any;
    openDialog: any;
    closeDialog: any;
    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
}

export interface directionState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.EDUCATIONAL_PROGRAM_LIST]: Array<DirectionType>;
    [fields.EDUCATIONAL_PROGRAM_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: DirectionType|{};
    };
}

export type DirectionType = {
    [DirectionFields.ID]: number,
    [DirectionFields.TITLE]: string,
    [DirectionFields.NUMBER]: string,
    [DirectionFields.QUALIFICATION]: string,
    [DirectionFields.EDUCATIONAL_PROFILE]: string,
    [DirectionFields.FACULTY]: string,
    [DirectionFields.EDUCATION_FORM]: string,
    [DirectionFields.CAN_EDIT]: string,
};

export interface EducationalProgramProps extends WithStyles<typeof styles> {
    actions: DirectionActions;
    educationalProgram: Array<DirectionType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    canEdit: boolean;
    sortingMode: SortingType;
}