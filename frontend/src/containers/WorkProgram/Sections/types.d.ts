import {WorkProgramActions} from '../types';
import {SectionType} from '../types';
import {WithStyles} from "@material-ui/core";
import styles from "./Sections.styles";

export interface SectionsProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    sections: Array<SectionType>;
    isCanEdit: boolean;
    totalHours: string;
    lectureHours: Array<string>;
    practiceHours: Array<string>;
    labHours: Array<string>;
    srsHours: Array<string>;
    semesterCount: number;
}


