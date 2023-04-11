import {WithStyles} from '@mui/styles';
import styles from "../CreateModal.styles";
import {SelectorListType} from "../../../../../components/SearchSelector/types";
import {WorkProgramActions} from "../../../../WorkProgram/types";

export interface AddResultsModalProps extends WithStyles<typeof styles> {
    isOpen: boolean;
    closeDialog: Function;
    saveDialog: Function;
    workProgramActions: WorkProgramActions;
    resultsList: SelectorListType;
    workProgramId: number;
}
