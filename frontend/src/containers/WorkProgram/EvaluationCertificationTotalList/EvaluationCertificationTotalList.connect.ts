import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {
    getWorkProgramEvaluationToolsList,
    getWorkProgramField,
    getWorkProgramIntermediateCertificationList,
} from '../getters';

import {rootState} from "../../../store/reducers";
import {WorkProgramGeneralFields} from "../enum";

const mapStateToProps = (state:rootState) => {
    return {
        evaluationToolsList: getWorkProgramEvaluationToolsList(state),
        intermediateCertificationList: getWorkProgramIntermediateCertificationList(state),
        extraPoints: getWorkProgramField(state, WorkProgramGeneralFields.EXTRA_POINTS) == 3 ? 3 : 0,
        semesterCount: getWorkProgramField(state, WorkProgramGeneralFields.SEMESTER_COUNT) || 1,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
