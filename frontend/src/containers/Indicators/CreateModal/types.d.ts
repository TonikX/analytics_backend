import {WithStyles} from "@material-ui/core";
import {IndicatorProgramActions} from '../types';

import styles from "./CreateModal.styles";
import {CompetenceActions} from "../../Competences/types";

export interface IndicatorCreateModalProps extends WithStyles<typeof styles> {
    actions: IndicatorProgramActions;
    competenceActions: CompetenceActions;
    isOpen: boolean;
    indicator: any;
    competenceList: Array<{value: string; label: string}>
}