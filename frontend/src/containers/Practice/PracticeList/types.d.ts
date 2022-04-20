import {WithStyles} from "@material-ui/core";
import styles from './PracticeList.styles'
import {practiceState} from "../types";

export interface PracticeListProps extends WithStyles<typeof styles> {
    actions: PracticeListActions,
    practiceList: Array<any>,
}

export interface practiceListState {
    results: Array<practiceState>;
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
}
