import {WithStyles} from "@material-ui/core";
import {EducationalProgramActions} from '../types';

import styles from "./CreateModal.styles";

export interface CourseCreateModalProps extends WithStyles<typeof styles> {
    actions: EducationalProgramActions;
    isOpen: boolean;
    educationalProgram: any;
}