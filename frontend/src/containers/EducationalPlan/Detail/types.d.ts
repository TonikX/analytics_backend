import {WithStyles} from "@material-ui/core";
import styles from './Detail.styles';
import {EducationalPlanActions, EducationalPlanType, DisciplineBlockType} from "../types";
import {FolderActions} from "../../Profile/Folders/types";
import {UserType} from "../../../layout/types";
import {DirectionType} from "../../Direction/types";
import {TrainingModulesActions} from "../TrainingModules/types";

export interface EducationalPlanDetailProps extends WithStyles<typeof styles> {
  actions: EducationalPlanActions;
  trainingModulesActions: TrainingModulesActions;
  foldersActions: FolderActions;
  detailPlan: EducationalPlanType;
  blocks: Array<DisciplineBlockType>;
  trajectoryRoute?: boolean;
  user: UserType;
  direction: DirectionType;
  canSendToValidate: boolean;
  canValidate: boolean;
  statusInfo: {
    backgroundColor: string;
    status: string;
    statusText: string;
  }
}