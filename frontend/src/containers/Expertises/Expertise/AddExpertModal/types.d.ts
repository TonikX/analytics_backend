import {WithStyles} from "@mui/material";
import styles from "./Expertis.styles";
import {ExpertisesActions, ExpertiseType} from '../../types';
import {GeneralActions} from '../../../../layout/types'
import {SelectorListType} from "../../../../components/SearchSelector/types";

export interface ExpertiseProps extends WithStyles<typeof styles> {
    actions: ExpertisesActions;
    generalActions: GeneralActions;
    isOpen: boolean;
    usersList: SelectorListType;
}
