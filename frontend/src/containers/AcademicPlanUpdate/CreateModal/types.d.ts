import {WithStyles} from "@material-ui/core";
import {AcademicPlanUpdateActions} from '../types';

import styles from "./CreateModal.styles";


export interface CreateModalProps extends WithStyles<typeof styles> {
    actions: AcademicPlanUpdateActions;
    isOpen: boolean;
}
