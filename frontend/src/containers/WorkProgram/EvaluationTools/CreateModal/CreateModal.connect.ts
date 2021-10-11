import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {rootState} from "../../../../store/reducers";

import actions from "../../actions";
import {getAllSectionsForSelect, isOpenDialog, getDialogData, getWorkProgramField} from '../../getters';
import {WorkProgramActions} from "../../types";
import {fields, WorkProgramGeneralFields} from "../../enum";

const mapStateToProps = (state: rootState) => {
    return {
        sections: getAllSectionsForSelect(state),
        isOpen: isOpenDialog(state, fields.CREATE_NEW_EVALUATION_TOOLS),
        evaluationTool: getDialogData(state, fields.CREATE_NEW_EVALUATION_TOOLS),
        semesterCount: getWorkProgramField(state, WorkProgramGeneralFields.SEMESTER_COUNT) || 1,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
