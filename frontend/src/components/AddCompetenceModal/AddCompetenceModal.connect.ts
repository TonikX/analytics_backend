import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import competenceActions from "../../containers/Competences/actions";

import {rootState} from "../../store/reducers";
import {getCompetencesForSelector} from "../../containers/Competences/getters";

const mapStateToProps = (state: rootState) => {
    return {
        competenceList: getCompetencesForSelector(state),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    competenceActions: bindActionCreators<any, any>(competenceActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
