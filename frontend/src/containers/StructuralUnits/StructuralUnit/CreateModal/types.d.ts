import {WithStyles} from "@material-ui/core";
import {StructuralUnitsActions} from '../../types';
import {structuralUnitType} from '../../types';
import styles from "./CreateModal.styles";

export interface AddUserToStructuralUnitModalProps extends WithStyles<typeof styles> {
    actions: StructuralUnitsActions;
    isOpen: boolean;
    structuralUnit: structuralUnitType;
}