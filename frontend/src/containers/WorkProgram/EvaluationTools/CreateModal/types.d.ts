import {WithStyles} from "@material-ui/core";
import {EvaluationToolType, WorkProgramActions} from '../../types';

import styles from "./CreateModal.styles";

export interface CreateModalProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    isOpen: boolean;
    handleClose: Function;
    evaluationTool: EvaluationToolType;
    sections: Array<{label: string, value: string}>
    types: Array<string>
}