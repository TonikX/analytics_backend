import {WithStyles} from "@mui/material";
import {RolesActions} from '../../types';

import styles from "./CreateModal.styles";
import {TrainingEntitiesActions} from "../../../TrainingEntities/types";

export interface RolesCreateModalProps extends WithStyles<typeof styles> {
    actions: RolesActions;
    isOpen: boolean;
    skill: any;
    trainingEntitiesActions: TrainingEntitiesActions;
    trainingEntities: Array<{value: string, label: string}>;
}