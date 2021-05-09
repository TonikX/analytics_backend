import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "./actions";
import {getEducationalPlan, getCurrentPage, getSearchQuery, getAllCount, getSortingMode, getSortingField} from './getters';
import {EducationalPlanActions} from "./types";

import {rootState} from "../../store/reducers";
// import {isUserInOpGroup} from "../../common/userRights";
// import {getUserGroups} from "../../layout/getters";

const mapStateToProps = (state: rootState) => {
    return {
        educationalPlan: getEducationalPlan(state),
        currentPage: getCurrentPage(state),
        searchQuery: getSearchQuery(state),
        allCount: getAllCount(state),
        sortingField: getSortingField(state),
        sortingMode: getSortingMode(state),
        canAddNewPlan: false
        // canAddNewPlan: isUserInOpGroup(getUserGroups(state))
    };
};

const mapDispatchToProps = (dispatch: Dispatch<EducationalPlanActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
