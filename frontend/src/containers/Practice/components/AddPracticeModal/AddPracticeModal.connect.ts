import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../../PracticeList/actions";

import {rootState} from "../../../../store/reducers";
import {getPracticeListForSelect} from "../../PracticeList/getters";

const mapStateToProps = (state: rootState) => {
    return {
        list: getPracticeListForSelect(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
