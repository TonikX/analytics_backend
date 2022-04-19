import {WithStyles} from "@material-ui/core";
import styles from './PracticeList.styles'

export interface PracticeListProps extends WithStyles<typeof styles> {
    actions: PracticeListActions,
    practiceList: Array<any>,
}

export interface practiceListState {
    results: Array<any>;
}


export interface PracticeListActions {
    getPracticeList: any;
    setPracticeList: any;
}
