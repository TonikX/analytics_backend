import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import trainingModulesActions from "../TrainingModules/actions";
import {
  canSendToValidate,
  canValidate,
  getEducationalPlanDetail,
  getEducationalPlanDetailBlocks,
  getTrajectoryDirection,
  getTrajectoryUserData,
  getStatusInfo
} from '../getters';
import {EducationalPlanActions} from "../types";

import {rootState} from "../../../store/reducers";
import folderActions from "../../Profile/Folders/actions";

const mapStateToProps = (state: rootState) => {
  return {
    detailPlan: getEducationalPlanDetail(state),
    blocks: getEducationalPlanDetailBlocks(state),
    types: getEducationalPlanDetailBlocks(state),
    user: getTrajectoryUserData(state),
    direction: getTrajectoryDirection(state),
    canSendToValidate: canSendToValidate(state),
    canValidate: canValidate(state),
    statusInfo: getStatusInfo(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<EducationalPlanActions>) => ({
  // @ts-ignore
  actions: bindActionCreators(actions, dispatch),
  // @ts-ignore
  foldersActions: bindActionCreators(folderActions, dispatch),
  // @ts-ignore
  trainingModulesActions: bindActionCreators(trainingModulesActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
