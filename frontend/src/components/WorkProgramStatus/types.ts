import {WithStyles} from "@material-ui/core";
import styles from "./WorkProgramStatus.styles";

export interface WorkProgramStatusProps extends WithStyles<typeof styles> {
    status: string;
}