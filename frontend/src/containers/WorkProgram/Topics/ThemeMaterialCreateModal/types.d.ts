import {WithStyles} from '@mui/styles';
import {WorkProgramActions} from '../types';

import styles from "./ThemeMaterialCreateModal.styles";

export interface ThemeCreateModalProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    isOpen: boolean;
    data: any;
}