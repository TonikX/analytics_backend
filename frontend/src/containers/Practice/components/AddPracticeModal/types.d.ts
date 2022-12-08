import {WithStyles} from "@material-ui/core";
import {PracticeListActions} from "../../PracticeList/types";

import styles from "../CreateModal.styles";
import {SelectorListType} from "../../../../components/SearchSelector/types";

export interface Props extends WithStyles<typeof styles> {
    isOpen: boolean;
    actions: PracticeListActions;
    list: SelectorListType;
    closeDialog: Function;
    saveDialog: Function;
}