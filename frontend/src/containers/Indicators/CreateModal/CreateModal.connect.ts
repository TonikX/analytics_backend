import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import competenceActions from "../../Competences/actions";
import {CompetenceActions} from "../../Competences/types";
import {isOpenDialog, getDialogData} from '../getters';
import {IndicatorProgramActions} from "../types";

import {rootState} from "../../../store/reducers";
import {getCompetencesForSelector} from "../../Competences/getters";

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDialog(state),
        indicator: getDialogData(state),
        competenceList: getCompetencesForSelector(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IndicatorProgramActions|CompetenceActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
    // @ts-ignore
    competenceActions: bindActionCreators(competenceActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
