import {connect} from 'react-redux';

import {rootState} from "../../../../store/reducers";
import {getPractice, getValidation} from "../../getters";
import {bindActionCreators} from "redux";
import actions from "../../actions";

const mapStateToProps = (state: rootState) => {
    return {
        fields: getPractice(state),
        validation: getValidation(state),
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
