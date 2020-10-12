import {fields} from './enum';
import {WithStyles} from "@material-ui/core";
import styles from "./Professions.styles";
import {SortingType} from "../../components/SortingButton/types";

export interface ProfessionsActions {
    changeSearchQuery: any;
    getProfessionsList: any;
    setProfessionsList: any;

    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
    changeFilteredRole: any;
}

export interface professionsState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.PROFESSIONS_LIST]: Array<any>;
}

export interface ProfessionsProps extends WithStyles<typeof styles> {
    actions: ProfessionsActions;
    professionsList: Array<any>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
}