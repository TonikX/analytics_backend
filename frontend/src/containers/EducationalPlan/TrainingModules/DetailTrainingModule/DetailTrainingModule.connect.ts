import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {rootState} from "../../../../store/reducers";

import actions from "../actions";
import educationPlansActions from "../../actions";

import {getTrainingModule} from "../getters";

export const mapStateToProps = (state: rootState) => {
    return {
        module: getTrainingModule(state),
        canEdit: true
    };
};

export const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
    educationPlansActions: bindActionCreators<any, any>(educationPlansActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
