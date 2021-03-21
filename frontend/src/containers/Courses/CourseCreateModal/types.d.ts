import {WithStyles} from "@material-ui/core";
import {CoursesActions} from '../types';

import styles from "./CourseCreateModal.styles";

export interface CourseCreateModalProps extends WithStyles<typeof styles> {
    actions: CoursesActions;
    isOpen: boolean;
    course: any;
}