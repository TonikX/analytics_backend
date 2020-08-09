import {WithStyles} from "@material-ui/core";
import {EducationalPlanActions, ModuleType} from '../../types';

import styles from "./ModuleModal.styles";
import {DirectionType} from "../../../Direction/types";

export interface DownloadFileModalProps extends WithStyles<typeof styles> {
    actions: EducationalPlanActions;
    isOpen: boolean;
    directions: Array<DirectionType>;
    downloadDialogData: any;
}