import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {getWorkProgramField} from '../getters';
import {WorkProgramActions} from "../types";

import {rootState} from "../../../store/reducers";

const mapStateToProps = (state:rootState) => {
    return {
        plans: getWorkProgramField(state, 'work_program_in_change_block') || []
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
