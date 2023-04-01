import {withStyles} from '@mui/styles';
import {WorkProgramActions} from '../types';
import {ResultsType} from "../types";

import styles from "./Results.styles";

export interface ResultsProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    resultsList: Array<ResultsType>;
    isCanEdit: boolean;
}