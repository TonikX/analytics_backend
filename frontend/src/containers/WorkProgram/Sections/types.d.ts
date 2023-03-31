import {WorkProgramActions} from '../types';
import {SectionType} from '../types';
import {WithStyles} from "@mui/material";
import styles from "./Sections.styles";
import {ImplementationFormatsEnum} from "../enum";

export interface SectionsProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    sections: Array<SectionType>;
    isCanEdit: boolean;
    totalHours: string;
    lectureHours: Array<string>;
    practiceHours: Array<string>;
    labHours: Array<string>;
    srsHours: Array<string>;
    consultationHours: Array<string>;
    contactHours: Array<string>;
    semesterCount: number;
    implementationFormat: ImplementationFormatsEnum;
}


