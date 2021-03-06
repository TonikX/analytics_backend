import {WithStyles} from "@material-ui/core";
import {EducationalPlanActions} from '../../types';
import {TrainingModulesActions} from '../../TrainingModules/types';
import {SelectorListType} from "../../../../components/SearchSelector/types";

import styles from "./AddModuleModal.styles";

export interface AddModuleModalProps extends WithStyles<typeof styles> {
    actions: EducationalPlanActions;
    moduleActions: TrainingModulesActions;
    isOpen: boolean;
    module: { blockId: string };
    modulesList: SelectorListType;
}