import {fields} from './enum';
import {WithStyles} from "@material-ui/core";
import styles from "./Expertises.styles";
import {SortingType} from "../../components/SortingButton/types";

export interface ExpertisesActions {
    changeSearchQuery: any;
    getExpertisesList: any;
    setExpertisesList: any;

    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
}

export interface expertisesState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.EXPERTISES_LIST]: Array<any>;
}

export interface ExpertisesProps extends WithStyles<typeof styles> {
    actions: ExpertisesActions;
    expertisesList: Array<any>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
}