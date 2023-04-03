import {WithStyles} from '@mui/styles';
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
