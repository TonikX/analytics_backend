import {WithStyles} from "@material-ui/core";
import {IntermediateCertificationType, WorkProgramActions} from '../types';

import styles from "./IntermediateCertification.styles";

export interface IntermediateCertificationProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    intermediateCertificationList: Array<IntermediateCertificationType>;
    isCanEdit: boolean;
    hasCourseProject: boolean;
    hasDiffPass: boolean;
    hasPass: boolean;
    hasExam: boolean;
    workProgramId: number;
    location: any; //todo: change type
}