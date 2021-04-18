import {WithStyles} from "@material-ui/core";
import styles from './Detail.styles';
import {EducationalPlanActions, EducationalPlanType, DisciplineBlockType} from "../types";
import {FolderActions} from "../../Profile/Folders/types";
import {UserType} from "../../../layout/types";
import {DirectionType} from "../../Direction/types";

export interface EducationalPlanDetailProps extends WithStyles<typeof styles> {
    actions: EducationalPlanActions;
    foldersActions: FolderActions;
    detailPlan: EducationalPlanType;
    blocks: Array<DisciplineBlockType>;
    trajectoryRoute?: boolean;
    user: UserType;
    direction: DirectionType;
}