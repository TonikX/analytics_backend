import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "./actions";
import {getCourses, getCurrentPage, getSearchQuery, getAllCount, getSortingMode, getSortingField} from './getters';
import {CoursesActions} from "./types";

import {rootState} from "../../store/reducers";

const mapStateToProps = (state: rootState) => {
    return {
        courses: getCourses(state),
        currentPage: getCurrentPage(state),
        searchQuery: getSearchQuery(state),
        allCount: getAllCount(state),
        sortingField: getSortingField(state),
        sortingMode: getSortingMode(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<CoursesActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
