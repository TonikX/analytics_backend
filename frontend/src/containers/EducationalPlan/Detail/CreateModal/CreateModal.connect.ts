import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import workProgramActions from "../../../WorkProgramList/actions";
import {WorkProgramListActions} from "../../../WorkProgramList/types";

import actions from "../../actions";
import {isOpenDetailDialog, getDetailDialogData} from '../../getters';
import {EducationalPlanActions} from "../../types";

import {rootState} from "../../../../store/reducers";
import {getWorkProgramsListForSelector} from "../../../WorkProgramList/getters";

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDetailDialog(state),
        educationalPlan: getDetailDialogData(state),
        workProgramList: getWorkProgramsListForSelector(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<EducationalPlanActions|WorkProgramListActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
    // @ts-ignore
    workProgramActions: bindActionCreators(workProgramActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
