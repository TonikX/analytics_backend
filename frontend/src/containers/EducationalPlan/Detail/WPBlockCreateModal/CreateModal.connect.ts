import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import workProgramActions from "../../../WorkProgramList/actions";

import actions from "../../actions";
import {isOpenDetailDialog, getDetailDialogData, getEducationalPlanDetailId} from '../../getters';

import {rootState} from "../../../../store/reducers";
import {getWorkProgramsListForSelector} from "../../../WorkProgramList/getters";

import moduleActions from '../../TrainingModules/actions';

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDetailDialog(state),
        blockOfWorkPrograms: getDetailDialogData(state),
        workProgramList: getWorkProgramsListForSelector(state),
        planId: getEducationalPlanDetailId(state)
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
    workProgramActions: bindActionCreators<any, any>(workProgramActions, dispatch),
    moduleActions: bindActionCreators<any, any>(moduleActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
