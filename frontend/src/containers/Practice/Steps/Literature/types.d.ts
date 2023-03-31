import {WithStyles} from "@mui/material";

import styles from "./styles";
import {PracticeActions} from "../../types";

export interface LiteratureProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    literatureList: Array<any>;
}