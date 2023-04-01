import {withStyles} from '@mui/styles';
import {CompetenceActions} from "../../containers/Competences/types";

import styles from "./AddCompetenceModal.styles";
import {SelectorListType} from "../SearchSelector/types";

export interface AddCompetenceModalProps extends WithStyles<typeof styles> {
    isOpen: boolean;
    closeDialog: Function;
    saveDialog: Function;
    competenceActions: CompetenceActions;
    competenceList: SelectorListType;
    competenceType?: 'ПК'
}