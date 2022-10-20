import {WithStyles} from "@material-ui/core";
import {WorkProgramListActions} from '../types';

import styles from "./CreateModal.styles";
import {SelectorListType} from "../../../components/SearchSelector/types";
import {StructuralUnitsActions} from "../../StructuralUnits/types";

export interface CreateModalProps extends WithStyles<typeof styles> {
    actions: WorkProgramListActions;
    structuralUnit: any;
    structuralUnitsList: SelectorListType;
    structuralUnitActions: StructuralUnitsActions;
    isOpen: boolean;
}
