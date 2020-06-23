import {WithStyles} from "@material-ui/core";

import {WorkProgramActions} from "../../types";
import {Section} from '../types';

import styles from "./EditedRow.styles";

export interface EditedRowProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    section: Section;
    removeNewSection: Function;
    count: number;
}

export interface EditedRowState {
    section: Section;
    isEditMode: boolean;
}