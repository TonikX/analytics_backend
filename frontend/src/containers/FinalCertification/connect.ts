import {connect} from 'react-redux';
import {rootState} from "../../store/reducers";
import {getCertification, getIsError} from './getters';
import {bindActionCreators} from "redux";
import actions from "./actions";

const mapStateToProps = (state: rootState) => {
    return {
        certification: getCertification(state),
        isError: getIsError(state),
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
