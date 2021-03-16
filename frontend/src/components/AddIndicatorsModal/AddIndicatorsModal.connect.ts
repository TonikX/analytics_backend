import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import indicatorsActions from "../../containers/Indicators/actions";

import {rootState} from "../../store/reducers";
import {getIndicatorsForSelector} from "../../containers/Indicators/getters";

const mapStateToProps = (state: rootState) => {
    return {
        indicatorsList: getIndicatorsForSelector(state),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    indicatorsActions: bindActionCreators<any, any>(indicatorsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
