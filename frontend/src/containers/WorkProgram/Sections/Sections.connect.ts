import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {getWorkProgramField, isCanEdit} from '../getters';
import {WorkProgramActions} from "../types";

import {rootState} from "../../../store/reducers";
import {fields} from "../enum";
import {getHoursArray, getAllHours} from "../utils";

const mapStateToProps = (state:rootState) => {
    const lectureHours = getHoursArray(getWorkProgramField(state, 'lecture_hours'));
    const practiceHours = getHoursArray(getWorkProgramField(state, 'practice_hours'));
    const labHours = getHoursArray(getWorkProgramField(state, 'lab_hours'));
    const srsHours = getHoursArray(getWorkProgramField(state, 'srs_hours'));

    return {
        sections: getWorkProgramField(state, fields.WORK_PROGRAM_SECTIONS),
        totalHours: getWorkProgramField(state, fields.WORK_PROGRAM_ALL_HOURS) || getAllHours(lectureHours, practiceHours, labHours, srsHours),
        isCanEdit: isCanEdit(state),
        lectureHours: lectureHours,
        practiceHours: practiceHours,
        labHours: labHours,
        srsHours: srsHours,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
