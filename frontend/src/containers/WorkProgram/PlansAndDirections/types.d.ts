import {WithStyles} from "@mui/material";
import styles from "./PlansAndDirections.styles";

export interface PlansAndDirectionsProps extends WithStyles<typeof styles> {
    plans: Array<any>,
    wpId: number,
}