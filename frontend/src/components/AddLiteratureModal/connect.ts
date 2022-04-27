import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import literatureActions from '../../containers/Literature/actions';
import {rootState} from "../../store/reducers";

import {getAllCount, getCurrentPage, getLiterature} from '../../containers/Literature/getters';
import {Dispatch} from "react";
import {LiteratureActions} from "../../containers/Literature/types";

const mapStateToProps = (state: rootState) => {
    return {
        literatureList: getLiterature(state),
        allCount: getAllCount(state),
        currentPage: getCurrentPage(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<LiteratureActions>) => ({
    // @ts-ignore
    literatureActions: bindActionCreators(literatureActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
