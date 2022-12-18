import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {rootState} from "../../../../store/reducers";
import {WorkProgramActions} from "../../../WorkProgram/types";
import {getPermissionsInfo, getPractice} from "../../getters";
import actions from "../../actions";


const mapStateToProps = (state:rootState) => {
    return {
        permissionsInfo: getPermissionsInfo(state),
        resultsList: getPractice(state).outcomes,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
