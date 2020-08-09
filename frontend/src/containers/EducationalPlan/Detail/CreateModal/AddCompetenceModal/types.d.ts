import {WithStyles} from "@material-ui/core";
import {CompetenceActions} from "../../../../Competences/types";

import styles from "../CreateModal.styles";
import {SelectorListType} from "../../../../../components/SearchSelector/types";

export interface AddWorkProgramModalProps extends WithStyles<typeof styles> {
    isOpen: boolean;
    closeDialog: Function;
    saveDialog: Function;
    competenceActions: CompetenceActions;
    competenceList: SelectorListType
}