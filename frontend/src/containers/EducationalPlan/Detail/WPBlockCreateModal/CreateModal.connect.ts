import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import workProgramActions from "../../../WorkProgramList/actions";

import actions from "../../actions";
import {isOpenDetailDialog, getDetailDialogData, getEducationalPlanDetailId, getAvailableButtons} from '../../getters';

import {rootState} from "../../../../store/reducers";
import {getWorkProgramsListForSelector} from "../../../WorkProgramList/getters";

import moduleActions from '../../TrainingModules/actions';

const mapStateToProps = (state: rootState) => {
    const {gia, practice, wp} = getAvailableButtons(state)
    return {
        isOpen: isOpenDetailDialog(state),
        blockOfWorkPrograms: getDetailDialogData(state),
        workProgramList: getWorkProgramsListForSelector(state),
        planId: getEducationalPlanDetailId(state),
        canAddGia: gia,
        canAddPractice: practice,
        canAddWp: wp,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
    workProgramActions: bindActionCreators<any, any>(workProgramActions, dispatch),
    moduleActions: bindActionCreators<any, any>(moduleActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
