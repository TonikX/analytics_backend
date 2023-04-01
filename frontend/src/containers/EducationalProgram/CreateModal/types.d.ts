import {withStyles} from '@mui/styles';
import {EducationalProgramActions} from '../types';

import styles from "./CreateModal.styles";
import {DirectionActions} from "../../Direction/types";
import {EducationalPlanActions} from "../../EducationalPlan/types";
import { EducationalPlanInDirectionActions } from "../../EduationPlanInDirection/types";
import {SelectorListType} from "../../../components/SearchSelector/types";

export interface CreateModalProps extends WithStyles<typeof styles> {
    actions: EducationalProgramActions;
    educationalPlanActions: EducationalPlanActions;
    directionActions: DirectionActions;
    isOpen: boolean;
    educationalPlansInDirection: any;
    educationalPlanList: SelectorListType;
    directionList: SelectorListType;
    educationPlanInDirectionActions: EducationalPlanInDirectionActions;
}