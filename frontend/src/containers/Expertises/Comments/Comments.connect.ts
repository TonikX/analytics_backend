import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {ExpertisesActions} from "../types";

import {rootState} from "../../../store/reducers";
import {getComments} from "../getters";

const mapStateToProps = (state:rootState) => {
    return {
        comments: getComments(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ExpertisesActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
