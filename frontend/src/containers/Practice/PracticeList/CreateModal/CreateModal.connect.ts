import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {getIsModalOpen} from '../getters';
import {PracticeListActions} from "../types";

import {rootState} from "../../../../store/reducers";

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: getIsModalOpen(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<PracticeListActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
