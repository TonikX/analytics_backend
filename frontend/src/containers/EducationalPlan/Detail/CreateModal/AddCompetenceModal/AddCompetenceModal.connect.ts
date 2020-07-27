import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import competenceActions from "../../../../Competences/actions";
import {CompetenceActions} from "../../../../Competences/types";

import {rootState} from "../../../../../store/reducers";
import {getCompetencesForSelector} from "../../../../Competences/getters";

const mapStateToProps = (state: rootState) => {
    return {
        competenceList: getCompetencesForSelector(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<CompetenceActions>) => ({
    // @ts-ignore
    competenceActions: bindActionCreators(competenceActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
