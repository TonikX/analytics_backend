import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "./actions";
import workProgramActions from "../WorkProgram/actions";
import {
    getWorkProgramList,
    getCurrentPage,
    getSearchQuery,
    getAllCount,
    getSortingMode,
    getSortingField,
    getShowOnlyMy,
    getShowArchive, getStatus, getWorkProgramIdForRedirect
} from './getters';

import {rootState} from "../../store/reducers";

const mapStateToProps = (state: rootState) => {
    return {
        workProgramList: getWorkProgramList(state),
        currentPage: getCurrentPage(state),
        searchQuery: getSearchQuery(state),
        allCount: getAllCount(state),
        sortingField: getSortingField(state),
        sortingMode: getSortingMode(state),
        showOnlyMy: getShowOnlyMy(state),
        showArchive: getShowArchive(state),
        status: getStatus(state),
        workProgramIdForRedirect: getWorkProgramIdForRedirect(state),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
    workProgramActions: bindActionCreators<any, any>(workProgramActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
