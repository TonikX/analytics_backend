import {WithStyles} from "@material-ui/core";
import {BlocksOfWorkProgramsType, EducationalPlanActions} from '../../types';
import {WorkProgramListActions} from "../../../WorkProgramList/types";

import styles from "./AddWorkProgramModal/AddWorkProgramModal.styles";
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
}