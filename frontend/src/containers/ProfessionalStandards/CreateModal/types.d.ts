import {WithStyles} from "@material-ui/core";
import {ProfessionalStandardsActions} from '../types';

import styles from "./CreateModal.styles";

export interface ProfessionalStandardsCreateModalProps extends WithStyles<typeof styles> {
    actions: ProfessionalStandardsActions;
    isOpen: boolean;
    professionalStandard: any;
}