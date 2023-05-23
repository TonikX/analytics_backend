import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {
    getWorkProgramField,
    getWorkProgramId,
    getWorkProgramIntermediateCertificationList,
    isCanEdit
} from '../getters';

import {rootState} from "../../../store/reducers";
import {isUserExpertiseMaster, isUserInExpertiseGroup} from "../../../common/userRights";
import {getUserGroups} from "../../../layout/getters";

const mapStateToProps = (state:rootState) => {
    return {
        intermediateCertificationList: getWorkProgramIntermediateCertificationList(state),
        isCanEdit: isCanEdit(state) || isUserExpertiseMaster(getUserGroups(state)),
        inChangeBlock: getWorkProgramField(state, 'work_program_in_change_block'),
        hasCourseProject: getWorkProgramField(state, 'have_course_project'),
        hasDiffPass: getWorkProgramField(state, 'have_course_project'),
        hasPass: getWorkProgramField(state, 'have_pass'),
        hasExam: getWorkProgramField(state, 'have_exam'),
        workProgramId: getWorkProgramId(state)
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
