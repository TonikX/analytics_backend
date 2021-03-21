import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "./actions";
import { getCurrentPage, getSearchQuery, getAllCount, getSortingMode, getSortingField} from './getters';
import {ProfessionalStandardsActions} from "./types";

import {rootState} from "../../store/reducers";
import {getProfessionalStandards} from "./getters";

const mapStateToProps = (state: rootState) => {
    return {
        professionalStandards: getProfessionalStandards(state),
        currentPage: getCurrentPage(state),
        searchQuery: getSearchQuery(state),
        allCount: getAllCount(state),
        sortingField: getSortingField(state),
        sortingMode: getSortingMode(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ProfessionalStandardsActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
