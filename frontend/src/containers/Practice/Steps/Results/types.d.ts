import {WithStyles} from "@material-ui/core";
import {ResultsType} from "../types";

import styles from "./Results.styles";
import {PracticeActions} from "../../types";
import {PermissionsInfoState} from "../../../FinalCertification/types";

export interface ResultsProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    resultsList: Array<ResultsType>;
    permissionsInfo: PermissionsInfoState,
}
