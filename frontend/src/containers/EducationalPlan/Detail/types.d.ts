import {WithStyles} from "@material-ui/core";
import styles from './Detail.styles';
import {EducationalPlanActions, EducationalPlanType, DisciplineBlockType} from "../types";

export interface EducationalPlanDetailProps extends WithStyles<typeof styles> {
    actions: EducationalPlanActions;
    detailPlan: EducationalPlanType;
    blocks: Array<DisciplineBlockType>;
}