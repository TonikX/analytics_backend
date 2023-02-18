import {WithStyles} from "@material-ui/core";

import styles from "./AddTrainingModuleModal.styles";
import {mapDispatchToProps, mapStateToProps} from "./AddTrainingModuleModal.connect";

export interface TrainingModuleCreateModalProps extends PropsFromRedux, ActionsFromRedux, WithStyles<typeof styles> {}

export type PropsFromRedux = ReturnType<mapStateToProps>;
export type ActionsFromRedux = ReturnType<mapDispatchToProps>;