import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {getWorkProgramField, isCanEdit} from '../getters';
import {fields} from "../enum";
import {WorkProgramActions} from "../types";

import {rootState} from "../../../store/reducers";

const mapStateToProps = (state:rootState) => {
    return {
        prerequisitesList: getWorkProgramField(state, fields.WORK_PROGRAM_PREREQUISITES) || [],
        isCanEdit: isCanEdit(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
