import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "./actions";
import {getAllKeywordsExceptSelected, getSelectedKeywords, getWorkPrograms, getSelectedSemester, getSelectedQualification} from './getters';
import {SelectDisciplineActions} from "./types";

import {rootState} from "../../store/reducers";

export const mapStateToProps = (state: rootState) => {
    return {
        allKeywords: getAllKeywordsExceptSelected(state),
        selectedKeywords: getSelectedKeywords(state),
        workPrograms: getWorkPrograms(state),
        semester: getSelectedSemester(state),
        qualification: getSelectedQualification(state),
    };
};

export const mapDispatchToProps = (dispatch: Dispatch<SelectDisciplineActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
