import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "./actions";
import {getIndividualTrajectories, getCurrentPage, getSearchQuery, getAllCount, getSortingMode, getSortingField, getShowOnlyMy} from './getters';

import {rootState} from "../../store/reducers";
import {isUserInOpGroup} from "../../common/userRights";
import {getUserGroups} from "../../layout/getters";

const mapStateToProps = (state: rootState) => {
    return {
        individualTrajectories: getIndividualTrajectories(state),
        currentPage: getCurrentPage(state),
        searchQuery: getSearchQuery(state),
        allCount: getAllCount(state),
        sortingField: getSortingField(state),
        sortingMode: getSortingMode(state),
        showOnlyMy: getShowOnlyMy(state),
        canEdit: isUserInOpGroup(getUserGroups(state))
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
