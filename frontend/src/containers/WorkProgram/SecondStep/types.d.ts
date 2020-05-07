import {WithStyles} from "@material-ui/core";
import styles from "./SecondStep.styles";

export interface SecondStepProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    isFetching: boolean;
    value: string;
}