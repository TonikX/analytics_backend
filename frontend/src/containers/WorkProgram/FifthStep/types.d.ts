import {WithStyles} from "@material-ui/core";
import {WorkProgramActions} from '../types';
import {EvaluationToolType} from "../types";

import styles from "./SixthStep.styles";

export interface SixthStepProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    evaluationToolsList: Array<EvaluationToolType>;
}