import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import indicatorsActions from "../../containers/Competences/actions";

import {rootState} from "../../store/reducers";
import {getIndicatorsForSelector} from "../../containers/Competences/getters";

const mapStateToProps = (state: rootState) => {
    return {
        indicatorsList: getIndicatorsForSelector(state),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    indicatorsActions: bindActionCreators<any, any>(indicatorsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
