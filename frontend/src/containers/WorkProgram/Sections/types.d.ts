import {WorkProgramActions} from '../types';
import {Section} from '../types';
import {WithStyles} from "@material-ui/core";
import styles from "./Sections.styles";

export interface SectionsProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    sections: Array<Section>;
    isCanEdit: boolean;
    totalHours: string;
    lectureHours: boolean;
    practiceHours: boolean;
    labHours: boolean;
    srsHours: boolean;
}


