import {WithStyles} from "@material-ui/core";
import {IndicatorProgramActions} from "../../../../Indicators/types";

import styles from "../CreateModal.styles";
import {SelectorListType} from "../../../../../components/SearchSelector/types";

export interface AddIndicatorsModalProps extends WithStyles<typeof styles> {
    isOpen: boolean;
    closeDialog: Function;
    saveDialog: Function;
    indicatorsActions: IndicatorProgramActions;
    indicatorsList: SelectorListType;
    competenceId: number;
}