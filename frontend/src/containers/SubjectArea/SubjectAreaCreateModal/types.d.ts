import {WithStyles} from '@mui/styles';
import {SubjectAreaActions} from '../types';

import styles from "./SubjectAreaCreateModal.styles";

export interface SubjectAreaCreateModalProps extends WithStyles<typeof styles> {
    actions: SubjectAreaActions;
    isOpen: boolean;
    subjectArea: any;
}