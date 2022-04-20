import {WithStyles} from "@material-ui/core";
import styles from "./CreateModal.styles";
import {PracticeListActions} from "../types";

export interface CreateModalProps extends WithStyles<typeof styles> {
    actions: PracticeListActions;
    isOpen: boolean;
}