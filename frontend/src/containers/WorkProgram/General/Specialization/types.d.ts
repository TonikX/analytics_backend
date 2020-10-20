import {WithStyles} from "@material-ui/core";
import styles from "./Specialization.styles";

export interface SpecializationProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    isFetching: boolean;
    value: string;
    isCanEdit: boolean;
}