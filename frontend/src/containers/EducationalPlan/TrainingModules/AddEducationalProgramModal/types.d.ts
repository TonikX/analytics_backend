import {withStyles} from '@mui/styles';

import styles from "./AddEducationalProgramModal.styles";
import {mapDispatchToProps, mapStateToProps} from "./AddEducationalProgramModal.connect";

export interface TrainingModuleCreateModalProps extends PropsFromRedux, ActionsFromRedux, WithStyles<typeof styles> {}

export type PropsFromRedux = ReturnType<mapStateToProps>;
export type ActionsFromRedux = ReturnType<mapDispatchToProps>;