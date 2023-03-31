import {WithStyles} from "@mui/material";
import {IndicatorProgramActions} from '../types';

import styles from "./CreateModal.styles";
import {CompetenceActions} from "../../Competences/types";

export interface IndicatorCreateModalProps extends WithStyles<typeof styles> {
    actions: IndicatorProgramActions;
    isOpen: boolean;
    indicator: any;
}