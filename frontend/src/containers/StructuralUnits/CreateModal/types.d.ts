import {withStyles} from '@mui/styles';
import {StructuralUnitsActions} from '../types';

import styles from "./CreateModal.styles";

export interface StructuralUnitsCreateModalProps extends WithStyles<typeof styles> {
    actions: StructuralUnitsActions;
    isOpen: boolean;
    structuralUnit: any;
}