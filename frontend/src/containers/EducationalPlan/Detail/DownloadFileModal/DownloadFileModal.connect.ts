import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../../actions";
import {isOpenDownloadDialog, getDownloadDialogData, getDirectionsDependedOnWorkProgram} from '../../getters';
import {EducationalPlanActions} from "../../types";

import {rootState} from "../../../../store/reducers";

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDownloadDialog(state),
        downloadDialogData: getDownloadDialogData(state),
        directions: getDirectionsDependedOnWorkProgram(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<EducationalPlanActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
