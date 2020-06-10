import {WithStyles} from "@material-ui/core";
import {CoursesActions} from "../../../Courses/types";
import {WorkProgramActions} from '../types';
import {Topic} from "../types";
import {SelectorListType} from "../../../../components/SearchSelector/types";

import styles from "./ThemeCreateModal.styles";

export interface ThemeCreateModalProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    coursesActions: CoursesActions;
    isOpen: boolean;
    handleClose: Function;
    courses: Array<{value: string, label: string}>;
    sections: Array<{value: string, label: string}>;
    coursesList: SelectorListType;
    topic: Topic;
}