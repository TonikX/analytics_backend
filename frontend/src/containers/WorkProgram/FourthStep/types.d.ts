import {WithStyles} from "@material-ui/core";
import {WorkProgramActions} from '../types';
import {Section} from "../types";
import styles from "./FourthStep.styles";

export interface FourthStepProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    sections: Array<Section>;
}