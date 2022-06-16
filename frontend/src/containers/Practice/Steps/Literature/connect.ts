import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../../actions";

import {rootState} from "../../../../store/reducers";
import {PracticeActions} from "../../types";
import {getLiteratureList} from "../../getters";

const mapStateToProps = (state:rootState) => {
    return {
        literatureList: getLiteratureList(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<PracticeActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
