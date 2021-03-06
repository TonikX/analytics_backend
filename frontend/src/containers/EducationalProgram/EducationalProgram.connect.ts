import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "./actions";
import {
    getCurrentPage,
    getSearchQuery,
    getAllCount,
    getSortingMode,
    getSortingField,
    getEducationalProgramList
} from './getters';
import {EducationalProgramActions} from "./types";

import {rootState} from "../../store/reducers";
import {isUserInOpGroup} from "../../common/userRights";
import {getUserGroups} from "../../layout/getters";

const mapStateToProps = (state: rootState) => {
    return {
        educationalProgram: getEducationalProgramList(state),
        currentPage: getCurrentPage(state),
        searchQuery: getSearchQuery(state),
        allCount: getAllCount(state),
        sortingField: getSortingField(state),
        sortingMode: getSortingMode(state),
        canAddNew: isUserInOpGroup(getUserGroups(state))
    };
};

const mapDispatchToProps = (dispatch: Dispatch<EducationalProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
