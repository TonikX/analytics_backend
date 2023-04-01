import {withStyles} from '@mui/styles';
import styles from "./WorkProgramStatus.styles";

export interface WorkProgramStatusProps extends WithStyles<typeof styles> {
    status: string;
    onClick?: Function;
    disabledStyle?: boolean;
}