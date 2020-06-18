import {WithStyles} from "@material-ui/core";
import {EducationalPlanActions} from "../types";
import styles from "./Detail.styles";

export interface EducationalPlanDetailProps extends WithStyles<typeof styles> {
    actions: EducationalPlanActions;
}