import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import structuralUnitActions from '../../StructuralUnits/actions';
import {WorkProgramGeneralFields} from "../enum";
import actions from "../actions";
import {getWorkProgramField, isCanEdit} from '../getters';

import {getUserGroups, isFetchingComponentByKey} from "../../../layout/getters";

import {rootState} from "../../../store/reducers";
import {getStructuralUnitsForSelector} from "../../StructuralUnits/getters";
import {EXPERTISE_MASTER} from "../../../common/userRights";

const mapStateToProps = (state:rootState) => {
    return {
        title: getWorkProgramField(state, WorkProgramGeneralFields.TITLE),
        code: getWorkProgramField(state, WorkProgramGeneralFields.CODE),
        authors: getWorkProgramField(state, WorkProgramGeneralFields.AUTHORS),
        date: getWorkProgramField(state, WorkProgramGeneralFields.APPROVAL_DATE),
        video: getWorkProgramField(state, WorkProgramGeneralFields.VIDEO_LINK),
        description: getWorkProgramField(state, WorkProgramGeneralFields.DESCRIPTION),
        qualification: getWorkProgramField(state, WorkProgramGeneralFields.QUALIFICATION),
        language: getWorkProgramField(state, WorkProgramGeneralFields.LANGUAGE),
        editors: getWorkProgramField(state, WorkProgramGeneralFields.EDITORS),
        structuralUnit: getWorkProgramField(state, WorkProgramGeneralFields.STRUCTURAL_UNIT),
        bars: getWorkProgramField(state, WorkProgramGeneralFields.BARS),
        offerta: getWorkProgramField(state, WorkProgramGeneralFields.OFFERTA),
        semesterCount: getWorkProgramField(state, WorkProgramGeneralFields.SEMESTER_COUNT),
        implementationFormat: getWorkProgramField(state, WorkProgramGeneralFields.IMPLEMENTATION_FORMAT),
        moodleLink: getWorkProgramField(state, WorkProgramGeneralFields.MOODLE_LINK),

        isCanEdit: isCanEdit(state),
        structuralUnitsList: getStructuralUnitsForSelector(state),
        inChangeBlock: getWorkProgramField(state, WorkProgramGeneralFields.WORK_PROGRAM_IN_CHANGE_BLOCK),

        fetchingCode: isFetchingComponentByKey(state, WorkProgramGeneralFields.CODE),
        fetchingTitle: isFetchingComponentByKey(state, WorkProgramGeneralFields.TITLE),
        fetchingDate: isFetchingComponentByKey(state, WorkProgramGeneralFields.APPROVAL_DATE),
        fetchingAuthors: isFetchingComponentByKey(state, WorkProgramGeneralFields.AUTHORS),
        fetchingVideoLink: isFetchingComponentByKey(state, WorkProgramGeneralFields.VIDEO_LINK),
        fetchingDescription: isFetchingComponentByKey(state, WorkProgramGeneralFields.DESCRIPTION),
        fetchingMoodleLink: isFetchingComponentByKey(state, WorkProgramGeneralFields.MOODLE_LINK),
        canAddEditors: isCanEdit(state) || getUserGroups(state)?.includes(EXPERTISE_MASTER),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    structuralUnitActions: bindActionCreators<any, any>(structuralUnitActions, dispatch),
    actions: bindActionCreators<any, any>(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
