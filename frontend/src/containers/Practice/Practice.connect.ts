import {connect} from 'react-redux';
import {rootState} from "../../store/reducers";
import {getIsError, getPractice} from './getters';
import {bindActionCreators} from "redux";
import actions from "./actions";

const mapStateToProps = (state: rootState) => {
    return {
        practice: getPractice(state),
        isError: getIsError(state),
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
