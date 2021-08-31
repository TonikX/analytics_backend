import {WithStyles} from "@material-ui/core";
import {IntermediateCertificationType, WorkProgramActions} from '../../types';

import styles from "./DescriptionModal.styles";

export interface DescriptionModalProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    isOpen: boolean;
    description: string;
    workProgramId: number;
    history: any; //todo: change type
    evaluationTool: IntermediateCertificationType;
}