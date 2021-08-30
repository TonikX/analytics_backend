import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {getWorkProgramEvaluationToolsList, getWorkProgramField, getWorkProgramId, isCanEdit} from '../getters';

import {rootState} from "../../../store/reducers";
import {WorkProgramGeneralFields} from "../enum";

const mapStateToProps = (state:rootState) => {
    return {
        evaluationToolsList: getWorkProgramEvaluationToolsList(state),
        isCanEdit: isCanEdit(state),
        extraPoints: getWorkProgramField(state, WorkProgramGeneralFields.EXTRA_POINTS),
        workProgramId: getWorkProgramId(state)
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
