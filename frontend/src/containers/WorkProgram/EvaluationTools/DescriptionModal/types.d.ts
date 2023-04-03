import {WithStyles} from '@mui/styles';
import {EvaluationToolType, WorkProgramActions} from '../../types';

import styles from "./DescriptionModal.styles";

export interface DescriptionModalProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    isOpen: boolean;
    description: string;
    workProgramId: number;
    evaluationTool: EvaluationToolType;
    history: any; //todo: change type
}