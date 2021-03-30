import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {getWorkProgramField, getWorkProgramIntermediateCertificationList, isCanEdit, isStudent} from '../getters';
import {WorkProgramActions} from "../types";

import {rootState} from "../../../store/reducers";

const mapStateToProps = (state:rootState) => {
    return {
        intermediateCertificationList: getWorkProgramIntermediateCertificationList(state),
        isCanEdit: isCanEdit(state),
        isStudent: isStudent(state),
        hasCourseProject: getWorkProgramField(state, 'have_course_project'),
        hasDiffPass: getWorkProgramField(state, 'have_course_project'),
        hasPass: getWorkProgramField(state, 'have_pass'),
        hasExam: getWorkProgramField(state, 'have_exam'),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
