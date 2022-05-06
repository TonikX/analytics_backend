import {WithStyles} from "@material-ui/core";
import styles from './styles'
import {CertificationState} from "../types";
import {SortingType} from "../../../components/SortingButton/types";

export interface CertificationListProps extends WithStyles<typeof styles> {
    actions: CertificationListActions,
    certificationList: Array<any>,
    sortingField: string,
    certificationCount: number,
    currentPage: number,
}

export interface certificationListState {
    results: Array<CertificationState>;
    certificationCount: number,
    currentPage: number,
    sorting: {
        field: string,
        mode: SortingType,
    },
    searchText: string,
}


export interface CertificationListActions {
    getCertificationList: any;
    setCertificationList: any;
    setSearchText: any;
    setSortingField: any;
    setCertificationCount: any;
    setCurrentPage: any;
}
