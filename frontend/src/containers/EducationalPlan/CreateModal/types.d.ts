import {WithStyles} from "@material-ui/core";
import {EducationalPlanActions} from '../types';

import styles from "./CreateModal.styles";

export interface CreateModalProps extends WithStyles<typeof styles> {
    actions: EducationalPlanActions;
    isOpen: boolean;
    educationalPlan: any;
}