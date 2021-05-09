import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "./actions";
import {
    getExpertisesList,
    getCurrentPage,
    getSearchQuery,
    getAllCount,
    getSortingMode,
    getSortingField,
    getSelectedStatus
} from './getters';

import {rootState} from "../../store/reducers";

const mapStateToProps = (state: rootState) => {
    return {
        expertisesList: getExpertisesList(state),
        currentPage: getCurrentPage(state),
        searchQuery: getSearchQuery(state),
        allCount: getAllCount(state),
        sortingField: getSortingField(state),
        sortingMode: getSortingMode(state),
        selectedStatus: getSelectedStatus(state)
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
