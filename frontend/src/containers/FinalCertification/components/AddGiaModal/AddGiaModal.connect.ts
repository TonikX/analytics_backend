import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../../CertificationList/actions";

import {rootState} from "../../../../store/reducers";
import {getCertificationListForSelect} from "../../CertificationList/getters";

const mapStateToProps = (state: rootState) => {
    return {
        list: getCertificationListForSelect(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
