import {WithStyles} from '@mui/styles';
import styles from "./PlansAndDirections.styles";

export interface PlansAndDirectionsProps extends WithStyles<typeof styles> {
    plans: Array<any>,
    wpId: number,
}