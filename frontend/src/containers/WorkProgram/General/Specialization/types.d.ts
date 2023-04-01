import {withStyles} from '@mui/styles';
import styles from "./Specialization.styles";
import {WorkProgramActions} from "../../types";

export interface SpecializationProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    isFetching: boolean;
    value: string;
    isCanEdit: boolean;
    disabled?: boolean;
}