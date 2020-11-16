import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {getEducationalPlanInDirectionForSelector} from '../getters';
import {EducationalPlanInDirectionActions} from "../types";

import {rootState} from "../../../store/reducers";

const mapStateToProps = (state: rootState) => {
    return {
        optionsList: getEducationalPlanInDirectionForSelector(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<EducationalPlanInDirectionActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
