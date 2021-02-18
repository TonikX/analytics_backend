import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import indicatorsActions from "../../../../Indicators/actions";
import {IndicatorProgramActions} from "../../../../Indicators/types";

import {rootState} from "../../../../../store/reducers";
import {getIndicatorsForSelector} from "../../../../Indicators/getters";

const mapStateToProps = (state: rootState) => {
    return {
        indicatorsList: getIndicatorsForSelector(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IndicatorProgramActions>) => ({
    // @ts-ignore
    indicatorsActions: bindActionCreators(indicatorsActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
