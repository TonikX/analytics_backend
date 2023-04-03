import {WithStyles} from '@mui/styles';

import styles from "./styles";
import {PracticeActions} from "../../types";

export interface LiteratureProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    literatureList: Array<any>;
}
