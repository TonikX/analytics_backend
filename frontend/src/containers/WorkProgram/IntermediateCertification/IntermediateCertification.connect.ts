import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {getWorkProgramField, getWorkProgramIntermediateCertificationList, isCanEdit} from '../getters';

import {rootState} from "../../../store/reducers";

const mapStateToProps = (state:rootState) => {
    return {
        intermediateCertificationList: getWorkProgramIntermediateCertificationList(state),
        isCanEdit: isCanEdit(state),
        hasCourseProject: getWorkProgramField(state, 'have_course_project'),
        hasDiffPass: getWorkProgramField(state, 'have_course_project'),
        hasPass: getWorkProgramField(state, 'have_pass'),
        hasExam: getWorkProgramField(state, 'have_exam'),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
