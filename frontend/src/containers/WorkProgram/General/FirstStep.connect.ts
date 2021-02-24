import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {WorkProgramGeneralFields} from "../enum";
import actions from "../actions";
import {getWorkProgramField, isCanEdit} from '../getters';
import {WorkProgramActions} from "../types";

import {isFetchingComponentByKey} from "../../../layout/getters";

import {rootState} from "../../../store/reducers";

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

        isCanEdit: isCanEdit(state),

        fetchingCode: isFetchingComponentByKey(state, WorkProgramGeneralFields.TITLE),
        fetchingTitle: isFetchingComponentByKey(state, WorkProgramGeneralFields.CODE),
        fetchingDate: isFetchingComponentByKey(state, WorkProgramGeneralFields.APPROVAL_DATE),
        fetchingAuthors: isFetchingComponentByKey(state, WorkProgramGeneralFields.AUTHORS),
        fetchingVideoLink: isFetchingComponentByKey(state, WorkProgramGeneralFields.DESCRIPTION),
        fetchingDescription: isFetchingComponentByKey(state, WorkProgramGeneralFields.VIDEO_LINK),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
