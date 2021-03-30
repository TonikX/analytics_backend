import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {getWorkProgramField, isCanEdit} from '../getters';
import {WorkProgramActions} from "../types";

import {rootState} from "../../../store/reducers";
import {fields} from "../enum";

const mapStateToProps = (state:rootState) => {
    return {
        sections: getWorkProgramField(state, fields.WORK_PROGRAM_SECTIONS),
        totalHours: getWorkProgramField(state, fields.WORK_PROGRAM_ALL_HOURS),
        isCanEdit: isCanEdit(state),
        lectureHours: getWorkProgramField(state, 'lecture_hours'),
        practiceHours: getWorkProgramField(state, 'practice_hours'),
        labHours: getWorkProgramField(state, 'lab_hours'),
        srsHours: getWorkProgramField(state, 'srs_hours'),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
