import {WithStyles} from "@mui/material";
import {CertificationListActions} from "../../CertificationList/types";

import styles from "../CreateModal.styles";
import {SelectorListType} from "../../../../components/SearchSelector/types";

export interface Props extends WithStyles<typeof styles> {
    isOpen: boolean;
    actions: CertificationListActions;
    list: SelectorListType;
    closeDialog: Function;
    saveDialog: Function;
}