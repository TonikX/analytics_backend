import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {WorkProgramActions} from "../types";

import {rootState} from "../../../store/reducers";
import {getWorkProgramComments, getWorkProgramExpertiseId} from "../getters";

const mapStateToProps = (state:rootState) => {
    return {
        workProgramExpertiseId: getWorkProgramExpertiseId(state),
        comments: getWorkProgramComments(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
