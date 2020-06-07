import {WithStyles} from "@material-ui/core";
import {WorkProgramActions} from '../types';
import {PrerequisiteType} from "../types";

import styles from "./SixthStep.styles";

export interface SixthStepProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    prerequisitesList: Array<PrerequisiteType>;
}