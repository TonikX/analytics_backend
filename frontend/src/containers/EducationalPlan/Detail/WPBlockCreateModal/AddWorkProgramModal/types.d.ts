import {withStyles} from '@mui/styles';
import {WorkProgramListActions} from "../../../../WorkProgramList/types";

import styles from "../CreateModal.styles";
import {SelectorListType} from "../../../../../components/SearchSelector/types";

export interface AddWorkProgramModalProps extends WithStyles<typeof styles> {
    isOpen: boolean;
    workProgramActions: WorkProgramListActions;
    workProgramList: SelectorListType;
    closeDialog: Function;
    saveDialog: Function;
}