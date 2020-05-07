import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {fields} from "../enum";
import actions from "../actions";
import {getWorkProgramField} from '../getters';
import {WorkProgramActions} from "../types";

import {isFetchingComponentByKey} from "../../../layout/getters";

import {rootState} from "../../../store/reducers";

const mapStateToProps = (state:rootState) => {
    return {
        title: getWorkProgramField(state, fields.WORK_PROGRAM_TITLE),
        code: getWorkProgramField(state, fields.WORK_PROGRAM_CODE),
        fetchingCode: isFetchingComponentByKey(state, fields.WORK_PROGRAM_CODE),
        fetchingTitle: isFetchingComponentByKey(state, fields.WORK_PROGRAM_TITLE),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
