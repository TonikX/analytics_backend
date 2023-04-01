import {withStyles} from '@mui/styles';
import styles from "./CreateModal.styles";
import {PracticeListActions} from "../types";
import {RouteComponentProps} from "react-router-dom";
import {SelectorListType} from "../../../../components/SearchSelector/types";
import {StructuralUnitsActions, StructuralUnitType} from "../../../StructuralUnits/types";

export interface CreateModalProps extends WithStyles<typeof styles>, RouteComponentProps {
    actions: PracticeListActions;
    structuralUnitsList: SelectorListType;
    structuralUnit: StructuralUnitType | null;
    structuralUnitActions: StructuralUnitsActions;
    isOpen: boolean;
}

export type HoursSection = {
    ze_v_sem: number,
    evaluation_tools_v_sem: number[],
}

export type EditableRowProps = {
    section: HoursSection;
    semesterNum: number,
    updateRow: (section: HoursSection, semesterNum: number) => void;
}
