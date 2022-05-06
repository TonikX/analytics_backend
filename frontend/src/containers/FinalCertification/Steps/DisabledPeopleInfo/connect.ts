import {connect} from 'react-redux';

import {rootState} from "../../../../store/reducers";
import {bindActionCreators} from "redux";
import actions from "../../actions";
import {getTemplateText} from "../../getters";

const mapStateToProps = (state: rootState) => {
    return {
        templateText: getTemplateText(state),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
