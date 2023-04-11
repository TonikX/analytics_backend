import {WithStyles} from '@mui/styles';
import {BlocksOfWorkProgramsType, EducationalPlanActions} from '../../types';
import {WorkProgramListActions} from "../../../WorkProgramList/types";

import styles from "./CreateModal.styles";
import {SelectorListType} from "../../../../components/SearchSelector/types";
import {TrainingModulesActions} from "../../TrainingModules/types";

export interface CreateModalProps extends WithStyles<typeof styles> {
    actions: EducationalPlanActions;
    isOpen: boolean;
    educationalPlan: any;
    planId: number;
    workProgramActions: WorkProgramListActions;
    moduleActions: TrainingModulesActions;
    workProgramList: SelectorListType;
    blockOfWorkPrograms: BlocksOfWorkProgramsType;
    disableZUN: boolean;
    moduleId?: number;
    canAddGia?: number;
    canAddPractice?: number;
    canAddWp?: number;
}
