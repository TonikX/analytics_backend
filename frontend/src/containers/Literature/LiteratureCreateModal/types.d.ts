import {WithStyles} from "@material-ui/core";
import {LiteratureActions} from '../types';

import styles from "./LiteratureCreateModal.styles";

export interface LiteratureCreateModalProps extends WithStyles<typeof styles> {
    actions: LiteratureActions;
    isOpen: boolean;
    literature: any;
}