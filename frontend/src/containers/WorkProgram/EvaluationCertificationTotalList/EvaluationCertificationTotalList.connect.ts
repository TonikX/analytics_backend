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
import {getEvaluationToolsMaxSum, getIntermediateCertificationMaxSum} from "../utils";

const mapStateToProps = (state:rootState) => {
    return {
        evaluationToolsMaxSum: getEvaluationToolsMaxSum(getWorkProgramEvaluationToolsList(state)),
        intermediateCertificationMaxSum: getIntermediateCertificationMaxSum(getWorkProgramIntermediateCertificationList(state)),
        // eslint-disable-next-line
        extraPoints: getWorkProgramField(state, WorkProgramGeneralFields.EXTRA_POINTS) == 3 ? 3 : 0,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
