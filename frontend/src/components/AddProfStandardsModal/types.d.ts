import {WithStyles} from "@mui/material";
import {ProfessionalStandardsActions} from "../../containers/ProfessionalStandards/types";

import styles from "./AddProfStandardsModal.styles";
import {SelectorListType} from "../SearchSelector/types";

export interface AddProfStandardsModalProps extends WithStyles<typeof styles> {
    isOpen: boolean;
    closeDialog: Function;
    saveDialog: Function;
    profStandardsActions: ProfessionalStandardsActions;
    profStandardsList: SelectorListType
}