import {WithStyles} from "@mui/material";
import styles from "./WorkProgramStatus.styles";

export interface WorkProgramStatusProps extends WithStyles<typeof styles> {
    status: string;
    onClick?: Function;
    disabledStyle?: boolean;
}