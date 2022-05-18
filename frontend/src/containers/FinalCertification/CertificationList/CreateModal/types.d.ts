import {WithStyles} from "@material-ui/core";
import styles from "./CreateModal.styles";
import {RouteComponentProps} from "react-router-dom";
import {CertificationListActions} from "../types";

export interface CreateModalProps extends WithStyles<typeof styles>, RouteComponentProps {
    isOpen: boolean;
    actions: CertificationListActions;
}