import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {isOpenDialog, getDialogData} from '../getters';
import {LiteratureActions} from "../types";

import {rootState} from "../../../store/reducers";

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDialog(state),
        literature: getDialogData(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<LiteratureActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
