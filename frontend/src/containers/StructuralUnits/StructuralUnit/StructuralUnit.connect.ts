import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {getStructuralUnit} from '../getters';

import {rootState} from "../../../store/reducers";

const mapStateToProps = (state: rootState) => {
    return {
        structuralUnit: getStructuralUnit(state),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
