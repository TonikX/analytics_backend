import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {getWorkProgramField, isCanEdit} from '../getters';
import {WorkProgramActions} from "../types";

import {rootState} from "../../../store/reducers";
import {fields, ImplementationFormatsEnum, WorkProgramGeneralFields} from "../enum";
import {getHoursArray, getAllHours} from "../utils";

const mapStateToProps = (state:rootState) => {
    const lectureHours = getHoursArray(getWorkProgramField(state, 'lecture_hours_v2'));
    const practiceHours = getHoursArray(getWorkProgramField(state, 'practice_hours_v2'));
    const labHours = getHoursArray(getWorkProgramField(state, 'lab_hours_v2'));
    const srsHours = getHoursArray(getWorkProgramField(state, 'srs_hours_v2'));
    const contactHours = getHoursArray(getWorkProgramField(state, 'contact_hours_v2'));
    const consultationHours = getHoursArray(getWorkProgramField(state, 'consultation_v2'));

    return {
        sections: getWorkProgramField(state, fields.WORK_PROGRAM_SECTIONS),
        totalHours: getWorkProgramField(state, fields.WORK_PROGRAM_ALL_HOURS) || getAllHours(lectureHours, practiceHours, labHours, srsHours),
        isCanEdit: isCanEdit(state),
        lectureHours: lectureHours,
        practiceHours: practiceHours,
        labHours: labHours,
        srsHours: srsHours,
        contactHours: contactHours,
        consultationHours: consultationHours,
        showImplementationFormatError: !!getWorkProgramField(state, WorkProgramGeneralFields.IMPLEMENTATION_FORMAT) || ImplementationFormatsEnum.OFFLINE,
        semesterCount: getWorkProgramField(state, WorkProgramGeneralFields.SEMESTER_COUNT) || 1,
        implementationFormat: getWorkProgramField(state, WorkProgramGeneralFields.IMPLEMENTATION_FORMAT),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
