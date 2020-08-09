import {WithStyles} from "@material-ui/core";
import styles from "./PlansAndDirections.styles";

export interface PlansAndDirectionsProps extends WithStyles<typeof styles> {
    plans: Array<any>,
}