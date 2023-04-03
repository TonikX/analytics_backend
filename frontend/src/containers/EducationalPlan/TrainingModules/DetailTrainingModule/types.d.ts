import {RouteComponentProps} from "react-router-dom";
import {WithStyles} from '@mui/styles';
import {mapDispatchToProps, mapStateToProps} from "./DetailTrainingModule.connect";
import styles from "./DetailTrainingModule.styles";

export interface DetailTrainingModuleProps extends WithStyles<typeof styles>, RouteComponentProps, PropsFromRedux, ActionsFromRedux{
  module: any;
}

export type PropsFromRedux = ReturnType<mapStateToProps>;
export type ActionsFromRedux = ReturnType<mapDispatchToProps>;
