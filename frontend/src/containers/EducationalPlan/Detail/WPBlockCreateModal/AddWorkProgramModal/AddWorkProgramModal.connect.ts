import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import workProgramActions from "../../../../WorkProgramList/actions";
import {WorkProgramListActions} from "../../../../WorkProgramList/types";

import {rootState} from "../../../../../store/reducers";
import {getWorkProgramsListForSelector} from "../../../../WorkProgramList/getters";

const mapStateToProps = (state: rootState) => {
    return {
        workProgramList: getWorkProgramsListForSelector(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramListActions>) => ({
    // @ts-ignore
    workProgramActions: bindActionCreators(workProgramActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
