import {WithStyles} from "@material-ui/core";
import {WorkProgramActions} from '../types';
import {Topic} from "../types";
import styles from "./ThemeCreateModal.styles";

export interface ThemeCreateModalProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    isOpen: boolean;
    handleClose: Function;
    courses: Array<{value: string, label: string}>;
    sections: Array<{value: string, label: string}>;
    topic: Topic;
}