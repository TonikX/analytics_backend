import {withStyles} from '@mui/styles';
import {EvaluationToolType, WorkProgramActions} from '../../types';

import styles from "./CreateModal.styles";

export interface CreateModalProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    isOpen: boolean;
    handleClose: Function;
    evaluationTool: EvaluationToolType;
    sections: Array<{label: string, value: string}>
    semesterCount: number;
}