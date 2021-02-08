import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "./actions";
import {getTrainingModulesList, getCurrentPage, getSearchQuery, getAllCount, getSortingMode, getSortingField} from './getters';

import {rootState} from "../../store/reducers";
import {isUserInOpGroup} from "../../common/userRights";
import {getUserGroups} from "../../layout/getters";

export const mapStateToProps = (state: rootState) => {
    return {
        trainingModules: getTrainingModulesList(state),
        currentPage: getCurrentPage(state),
        searchQuery: getSearchQuery(state),
        allCount: getAllCount(state),
        sortingField: getSortingField(state),
        sortingMode: getSortingMode(state),
        canEdit: isUserInOpGroup(getUserGroups(state))
    };
};

export const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
