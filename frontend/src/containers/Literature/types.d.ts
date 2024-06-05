import {fields, literatureEbscoFields} from './enum';
import {WithStyles} from '@mui/styles';
import styles from "./WorkProgram.styles";
import {literatureFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";

export interface LiteratureActions {
    changeSearchQuery: any;
    getLiterature: any;
    setLiterature: any;
    createNewLiterature: any;
    changeLiterature: any;
    deleteLiterature: any;
    openDialog: any;
    closeDialog: any;
    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
}

export interface literatureState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.LITERATURE_LIST]: Array<LiteratureType>;
    [fields.LITERATURE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: LiteratureType|{};
    };
}

export type LiteratureType = {
    [literatureFields.ID]: number,
    [literatureFields.DESCRIPTION]: string,
    [literatureFields.DESCRIPTION_EBSCO]?: string,
};

export type LiteratureEbscoType = {
    [literatureEbscoFields.ID]: number,
    [literatureEbscoFields.DESCRIPTION]: string,
};

export interface LiteratureProps extends WithStyles<typeof styles> {
    actions: LiteratureActions;
    literature: Array<LiteratureType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
}
