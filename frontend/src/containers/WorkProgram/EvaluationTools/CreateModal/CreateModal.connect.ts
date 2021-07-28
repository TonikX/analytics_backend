import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {rootState} from "../../../../store/reducers";

import actions from "../../actions";
import {getAllSectionsForSelect, isOpenDialog, getDialogData} from '../../getters';
import {WorkProgramActions} from "../../types";
import {fields} from "../../enum";

const mapStateToProps = (state: rootState) => {
    return {
        sections: getAllSectionsForSelect(state),
        isOpen: isOpenDialog(state, fields.CREATE_NEW_EVALUATION_TOOLS),
        evaluationTool: getDialogData(state, fields.CREATE_NEW_EVALUATION_TOOLS),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
