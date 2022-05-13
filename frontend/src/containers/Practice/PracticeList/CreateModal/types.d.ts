import {WithStyles} from "@material-ui/core";
import styles from "./CreateModal.styles";
import {PracticeListActions} from "../types";
import {RouteComponentProps} from "react-router-dom";

export interface CreateModalProps extends WithStyles<typeof styles>, RouteComponentProps {
    actions: PracticeListActions;
    isOpen: boolean;
}