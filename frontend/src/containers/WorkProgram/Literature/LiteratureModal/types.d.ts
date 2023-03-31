import {WithStyles} from "@mui/material";
import {LiteratureActions, LiteratureType} from "../../../Literature/types";
import {WorkProgramActions} from '../../types';
import {Topic} from "../types";

import styles from "./LiteratureModal.styles";

export interface LiteratureModalProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    literatureActions: LiteratureActions;
    isOpen: boolean;
    selectedItems: Array<LiteratureType>;
    literatureList: Array<LiteratureType>;
    topic: Topic;
    currentPage: number;
    allCount: number;
}