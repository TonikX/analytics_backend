import {WithStyles} from "@mui/material";
import {ProfessionalStandardsActions} from '../types';

import styles from "./CreateModal.styles";

export interface ProfessionalStandardsCreateModalProps extends WithStyles<typeof styles> {
    actions: ProfessionalStandardsActions;
    isOpen: boolean;
    professionalStandard: any;
}