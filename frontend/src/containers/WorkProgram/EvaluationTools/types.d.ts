import {withStyles} from '@mui/styles';
import {WorkProgramActions} from '../types';
import {EvaluationToolType} from "../types";

import styles from "./EvaluationTools.styles";

export interface SixthStepProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    evaluationToolsList: Array<EvaluationToolType>;
    isCanEdit: boolean;
    extraPoints: string;
    workProgramId: number;
    location: any; //todo: change
}