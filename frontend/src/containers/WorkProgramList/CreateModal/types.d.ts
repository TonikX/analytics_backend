import {WithStyles} from "@material-ui/core";
import {WorkProgramListActions} from '../types';

import styles from "./CreateModal.styles";

export interface CreateModalProps extends WithStyles<typeof styles> {
    actions: WorkProgramListActions;
    isOpen: boolean;
}