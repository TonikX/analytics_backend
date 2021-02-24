import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {getWorkProgramEvaluationToolsList, getWorkProgramField, isCanEdit, isStudent} from '../getters';
import {WorkProgramActions} from "../types";

import {rootState} from "../../../store/reducers";
import {WorkProgramGeneralFields} from "../enum";

const mapStateToProps = (state:rootState) => {
    return {
        evaluationToolsList: getWorkProgramEvaluationToolsList(state),
        isCanEdit: isCanEdit(state),
        isStudent: isStudent(state),
        extraPoints: getWorkProgramField(state, WorkProgramGeneralFields.EXTRA_POINTS),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
