import {WithStyles} from '@mui/styles';
import {LiteratureActions, LiteratureType} from "../../../Literature/types";
import {WorkProgramActions} from '../../types';
import {Topic} from "../types";

import styles from "./LiteratureModal.styles";

export interface LiteratureModalProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    isOpen: boolean;
    selectedItems: Array<LiteratureType>;
}
