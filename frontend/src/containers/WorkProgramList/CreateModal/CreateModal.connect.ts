import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {isOpenDialog} from '../getters';
import {WorkProgramListActions} from "../types";

import {rootState} from "../../../store/reducers";

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDialog(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramListActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
