import {WithStyles} from "@material-ui/core";

import styles from "./styles";
import {PracticeActions} from "../../types";

export interface LiteratureProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    literatureIdList: Array<string>;
}