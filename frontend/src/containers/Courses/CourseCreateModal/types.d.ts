import {WithStyles} from "@mui/material";
import {CoursesActions} from '../types';

import styles from "./CourseCreateModal.styles";

export interface CourseCreateModalProps extends WithStyles<typeof styles> {
    actions: CoursesActions;
    isOpen: boolean;
    step: number;
}