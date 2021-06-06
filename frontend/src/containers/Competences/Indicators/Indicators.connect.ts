import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {
    getIndicators,
    getCompetence
} from '../getters';

import {rootState} from "../../../store/reducers";

const mapStateToProps = (state: rootState) => {
    return {
        competence: getCompetence(state),
        indicators: getIndicators(state),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
