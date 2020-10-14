import {WithStyles} from "@material-ui/core";
import {ProfessionsActions} from '../types';

import styles from "./CreateModal.styles";

export interface ProfessionsCreateModalProps extends WithStyles<typeof styles> {
    actions: ProfessionsActions;
    isOpen: boolean;
    profession: any;
}