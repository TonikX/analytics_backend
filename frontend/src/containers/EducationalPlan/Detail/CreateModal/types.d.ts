import {WithStyles} from "@material-ui/core";
import {EducationalPlanActions} from '../types';
import {WorkProgramListActions} from "../../../WorkProgramList/types";

import styles from "./CreateModal.styles";
import {SelectorListType} from "../../../../components/SearchSelector/types";

export interface CreateModalProps extends WithStyles<typeof styles> {
    actions: EducationalPlanActions;
    isOpen: boolean;
    educationalPlan: any;
    workProgramActions: WorkProgramListActions;
    workProgramList: SelectorListType;
}