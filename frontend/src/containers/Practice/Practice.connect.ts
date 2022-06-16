import {connect} from 'react-redux';
import {rootState} from "../../store/reducers";
import {getComments, getIsError, getPermissionsInfo, getPractice} from './getters';
import {bindActionCreators} from "redux";
import actions from "./actions";

const mapStateToProps = (state: rootState) => {
    return {
        permissionsInfo: getPermissionsInfo(state),
        practice: getPractice(state),
        isError: getIsError(state),
        comments: getComments(state),
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
