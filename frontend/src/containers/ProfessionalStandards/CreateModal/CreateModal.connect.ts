import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {isOpenDialog, getDialogData} from '../getters';
import {ProfessionalStandardsActions} from "../types";

import {rootState} from "../../../store/reducers";

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDialog(state),
        professionalStandard: getDialogData(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ProfessionalStandardsActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
