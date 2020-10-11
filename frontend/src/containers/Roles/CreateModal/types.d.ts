import {WithStyles} from "@material-ui/core";
import {RolesActions} from '../types';

import styles from "./CreateModal.styles";

export interface RolesCreateModalProps extends WithStyles<typeof styles> {
    actions: RolesActions;
    isOpen: boolean;
    role: any;
}