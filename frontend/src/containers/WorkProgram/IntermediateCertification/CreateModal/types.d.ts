import {WithStyles} from "@mui/material";
import {IntermediateCertificationType, WorkProgramActions} from '../../types';

import styles from "./CreateModal.styles";

export interface CreateModalProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    isOpen: boolean;
    handleClose: Function;
    evaluationTool: IntermediateCertificationType;
    sections: Array<{label: string, value: string}>;
    types: Array;
    semesterCount: number;
}