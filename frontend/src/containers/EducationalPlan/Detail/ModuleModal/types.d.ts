import {WithStyles} from "@material-ui/core";
import {EducationalPlanActions, ModuleType} from '../../types';

import styles from "./ModuleModal.styles";

export interface ModuleModalProps extends WithStyles<typeof styles> {
    actions: EducationalPlanActions;
    isOpen: boolean;
    module: ModuleType;
}