import {WithStyles} from "@mui/material";
import {AcademicPlanUpdateActions} from '../types';

import styles from "./CreateModal.styles";


export interface CreateModalProps extends WithStyles<typeof styles> {
    actions: AcademicPlanUpdateActions;
    isOpen: boolean;
}
