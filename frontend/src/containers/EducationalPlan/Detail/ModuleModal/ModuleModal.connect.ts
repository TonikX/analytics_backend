import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../../actions";
import {isOpenModuleDialog, getModuleDialogData} from '../../getters';
import {EducationalPlanActions} from "../../types";

import {rootState} from "../../../../store/reducers";

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenModuleDialog(state),
        module: getModuleDialogData(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<EducationalPlanActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
