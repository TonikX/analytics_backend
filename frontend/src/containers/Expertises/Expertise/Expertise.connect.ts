import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import generalActions from "../../../layout/actions";
import {getExpertise} from '../getters';
import {ExpertisesActions} from "../types";

import {rootState} from "../../../store/reducers";

const mapStateToProps = (state: rootState) => {
    return {
        expertise: getExpertise(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ExpertisesActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
    // @ts-ignore
    generalActions: bindActionCreators(generalActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
