import {withStyles} from '@mui/styles';
import {IndicatorProgramActions} from "../../containers/Indicators/types";

import styles from "../../containers/EducationalPlan/Detail/WPBlockCreateModal/CreateModal.styles";
import {SelectorListType} from "../SearchSelector/types";

export interface AddIndicatorsModalProps extends WithStyles<typeof styles> {
    isOpen: boolean;
    closeDialog: Function;
    saveDialog: Function;
    indicatorsActions: IndicatorProgramActions;
    indicatorsList: SelectorListType;
    competenceId: number;
}