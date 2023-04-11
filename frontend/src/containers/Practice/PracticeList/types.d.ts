import {WithStyles} from '@mui/styles';
import styles from './PracticeList.styles'
import {PracticeState} from "../types";
import {SortingType} from "../../../components/SortingButton/types";

export interface PracticeListProps extends WithStyles<typeof styles> {
    actions: PracticeListActions,
    practiceList: Array<any>,
    sortingField: string,
    practiceCount: number,
    currentPage: number,
}

export interface practiceListState {
    results: Array<PracticeState>;
    practiceCount: number,
    currentPage: number,
    sorting: {
        field: string,
        mode: SortingType,
    },
    searchText: string,
    modal: {
        isModalOpen: boolean,
    }
}


export interface PracticeListActions {
    getPracticeList: any;
    setPracticeList: any;
    createPractice: any;
    openModal: any;
    closeModal: any;
    setSearchText: any;
    setSortingField: any;
    setPracticeCount: any;
    setCurrentPage: any;
}
