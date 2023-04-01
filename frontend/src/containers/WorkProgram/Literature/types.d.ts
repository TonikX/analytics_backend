import {withStyles} from '@mui/styles';
import {WorkProgramActions} from '../types';
import {Literature} from "../types";

import styles from "./Literature.styles";

export interface FourthStepProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    literatureList: Array<Literature>;
    isCanEdit: boolean;
}