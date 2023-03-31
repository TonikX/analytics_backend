import {fields} from './enum';
import {WithStyles} from "@mui/material";
import styles from "./Roles.styles";
import {SortingType} from "../../components/SortingButton/types";

export interface RolesActions {
    changeSearchQuery: any;
    getRolesList: any;
    setRolesList: any;

    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
    changeFilteredRole: any;
}

export interface rolesState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.ROLES_LIST]: Array<any>;
}

export interface RolesProps extends WithStyles<typeof styles> {
    actions: RolesActions;
    rolesList: Array<any>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
}