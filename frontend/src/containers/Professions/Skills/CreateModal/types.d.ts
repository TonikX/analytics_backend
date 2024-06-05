import {WithStyles} from '@mui/styles';
import {ProfessionsActions} from '../../types';

import styles from "./CreateModal.styles";
import {TrainingEntitiesActions} from "../../../TrainingEntities/types";

export interface ProfessionsCreateModalProps extends WithStyles<typeof styles> {
    actions: ProfessionsActions;
    isOpen: boolean;
    skill: any;
    trainingEntitiesActions: TrainingEntitiesActions;
    trainingEntities: Array<{value: string, label: string}>;
}
