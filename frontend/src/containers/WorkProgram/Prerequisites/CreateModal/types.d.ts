import {WithStyles} from '@mui/styles';
import {PrerequisiteType, WorkProgramActions} from '../../types';
import {SelectorListType} from "../../../../components/SearchSelector/types";

import styles from "./CreateModal.styles";
import {TrainingEntitiesActions} from "../../../TrainingEntities/types";
import {SubjectAreaActions} from "../../../SubjectArea/types";

export interface CreateModalProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    trainingEntitiesActions: TrainingEntitiesActions;
    subjectAreaActions: SubjectAreaActions;
    isOpen: boolean;
    handleClose: Function;
    trainingEntities: Array<{value: string, label: string}>;
    subjectArea: Array<{value: string, label: string}>;
    coursesList: SelectorListType;
    prerequisite: PrerequisiteType;
}
