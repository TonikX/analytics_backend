import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {rootState} from "../../../../../store/reducers";

import actions from "../../actions";
import {isOpenDialog, getDialogData} from '../../getters';
import {fields} from "../../enum";

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDialog(state, fields.EVALUATION_DESCRIPTION_MODULE_DIALOG),
        evaluationTool: getDialogData(state, fields.EVALUATION_DESCRIPTION_MODULE_DIALOG),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
