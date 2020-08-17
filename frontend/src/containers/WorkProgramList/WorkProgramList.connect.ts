import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "./actions";
import workProgramActions from "../WorkProgram/actions";
import {getWorkProgramList, getCurrentPage, getSearchQuery, getAllCount, getSortingMode, getSortingField} from './getters';
import {WorkProgramListActions} from "./types";

import {rootState} from "../../store/reducers";

const mapStateToProps = (state: rootState) => {
    return {
        workProgramList: getWorkProgramList(state),
        currentPage: getCurrentPage(state),
        searchQuery: getSearchQuery(state),
        allCount: getAllCount(state),
        sortingField: getSortingField(state),
        sortingMode: getSortingMode(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramListActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
    // @ts-ignore
    workProgramActions: bindActionCreators(workProgramActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
