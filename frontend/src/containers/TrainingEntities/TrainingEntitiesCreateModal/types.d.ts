import {WithStyles} from '@mui/styles';
import {TrainingEntitiesActions} from '../types';

import styles from "./TrainingEntitiesCreateModal.styles";
import {SubjectAreaActions} from "../../SubjectArea/types";

export interface TrainingEntitiesCreateModalProps extends WithStyles<typeof styles> {
    actions: TrainingEntitiesActions;
    subjectAreaActions: SubjectAreaActions;
    isOpen: boolean;
    trainingEntity: any;
    subjectAreaList: Array<{value: string, label: string}>
}