import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";

import {rootState} from "../../../../store/reducers";
import {getEvaluationListModule, getCanEdit} from "../getters";

const mapStateToProps = (state: rootState) => {
    return {
        evaluationToolsList: getEvaluationListModule(state) || [],
        isCanEdit: getCanEdit(state),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
