import {WithStyles} from "@material-ui/core";
import {WorkProgramActions} from '../types';
import {PrerequisiteType} from "../types";

import styles from "./Prerequisites.styles";

export interface SixthStepProps extends WithStyles<typeof styles> {
    isCanEdit: boolean;
    actions: WorkProgramActions;
    prerequisitesList: Array<PrerequisiteType>;
}