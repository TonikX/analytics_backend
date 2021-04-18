import {WithStyles} from "@material-ui/core";
import {CompetenceActions} from "../../containers/Competences/types";

import styles from "./AddCompetenceModal.styles";
import {SelectorListType} from "../SearchSelector/types";

export interface AddCompetenceModalProps extends WithStyles<typeof styles> {
    isOpen: boolean;
    closeDialog: Function;
    saveDialog: Function;
    competenceActions: CompetenceActions;
    competenceList: SelectorListType
}