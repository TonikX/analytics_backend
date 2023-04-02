import {WithStyles} from '@mui/styles';
import {EntityToEntityActions} from '../types';

import styles from "./TrainingEntitiesCreateModal.styles";
import {TrainingEntitiesActions} from "../../TrainingEntities/types";

export interface TrainingEntitiesCreateModalProps extends WithStyles<typeof styles> {
  actions: EntityToEntityActions;
  trainingEntitiesActions: TrainingEntitiesActions;
  isOpen: boolean;
  trainingEntity: any;
  trainingEntitiesList: Array<{value: string, label: string}>
}