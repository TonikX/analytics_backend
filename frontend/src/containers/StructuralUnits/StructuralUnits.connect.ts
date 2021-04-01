import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "./actions";
import { getCurrentPage, getSearchQuery, getAllCount, getSortingMode, getSortingField} from './getters';
import {StructuralUnitsActions} from "./types";

import {rootState} from "../../store/reducers";
import {getStructuralUnits} from "./getters";

const mapStateToProps = (state: rootState) => {
    return {
        structuralUnits: getStructuralUnits(state),
        currentPage: getCurrentPage(state),
        searchQuery: getSearchQuery(state),
        allCount: getAllCount(state),
        sortingField: getSortingField(state),
        sortingMode: getSortingMode(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<StructuralUnitsActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
