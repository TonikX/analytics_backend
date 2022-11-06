import {WithStyles} from "@material-ui/core";
import {EvaluationToolType} from '../../../../WorkProgram/types';

import styles from "./CreateModal.styles";

export interface CreateModalProps extends WithStyles<typeof styles> {
    actions: any;
    isOpen: boolean;
    evaluationTool: EvaluationToolType;
}