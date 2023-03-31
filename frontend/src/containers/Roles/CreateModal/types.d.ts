import {WithStyles} from "@mui/material";
import {RolesActions} from '../types';

import styles from "./CreateModal.styles";

export interface RolesCreateModalProps extends WithStyles<typeof styles> {
    actions: RolesActions;
    isOpen: boolean;
    role: any;
}