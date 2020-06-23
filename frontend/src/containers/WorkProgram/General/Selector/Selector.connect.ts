import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../../actions";
import {getWorkProgramField} from '../../getters';
import {fields} from "../../enum";
import {WorkProgramActions} from "../../types";

import {isFetchingComponentByKey} from "../../../../layout/getters";
import {rootState} from "../../../../store/reducers";

const mapStateToProps = (state:rootState) => {
    return {
        value: getWorkProgramField(state, fields.WORK_PROGRAM_QUALIFICATION),
        isFetching: isFetchingComponentByKey(state, fields.WORK_PROGRAM_QUALIFICATION),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
