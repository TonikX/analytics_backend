import {WithStyles} from "@mui/material";
import {WorkProgramActions} from '../types';
import {PrerequisiteType} from "../types";

import styles from "./Prerequisites.styles";

export interface SixthStepProps extends WithStyles<typeof styles> {
    isCanEdit: boolean;
    actions: WorkProgramActions;
    prerequisitesList: Array<PrerequisiteType>;
}