import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../../../layout/actions";
import {getUsersForSelector} from "../../../layout/getters";
import {GeneralActions} from "../../../layout/types";

import {rootState} from "../../../store/reducers";

const mapStateToProps = (state: rootState) => {
    return {
        optionsList: getUsersForSelector(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<GeneralActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
