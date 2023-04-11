import {WithStyles} from '@mui/styles';
import {AcademicPlanUpdateActions} from '../types';

import styles from "./CreateModal.styles";


export interface CreateModalProps extends WithStyles<typeof styles> {
    actions: AcademicPlanUpdateActions;
    isOpen: boolean;
}
