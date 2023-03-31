import {WithStyles} from "@mui/material";
import styles from "./CreateModal.styles";
import {RouteComponentProps} from "react-router-dom";
import {CertificationListActions} from "../types";
import {StructuralUnitsActions} from "../../../StructuralUnits/types";
import {StructuralUnitType} from "../../types";
import {SelectorListType} from "../../../../components/SearchSelector/types";
import {PracticeListActions} from "../../../Practice/PracticeList/types";

export interface CreateModalProps extends WithStyles<typeof styles>, RouteComponentProps {
    isOpen: boolean;
    actions: CertificationListActions;
    actions: PracticeListActions,
    structuralUnitsList: SelectorListType,
    structuralUnit: StructuralUnitType,
    structuralUnitActions: StructuralUnitsActions
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

