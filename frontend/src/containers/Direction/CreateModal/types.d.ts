import {WithStyles} from "@material-ui/core";
import {DirectionActions} from '../types';

import styles from "./CreateModal.styles";

export interface CourseCreateModalProps extends WithStyles<typeof styles> {
    actions: DirectionActions;
    isOpen: boolean;
    educationalProgram: any;
}