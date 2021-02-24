import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "./actions";
import {
    getWorkProgram,
    getWorkProgramField,
    isCanApprove,
    isCanArchive,
    isCanComment,
    isCanEdit,
    isCanAddToFolder,
    getIsHoursError,
    getWorkProgramEvaluationToolsList, getWorkProgramIntermediateCertificationList
} from './getters';
import {WorkProgramActions} from "./types";

import {rootState} from "../../store/reducers";
import {WorkProgramGeneralFields} from "./enum";
import {getFolders} from "../Profile/Folders/getters";
import folderActions from "../Profile/Folders/actions";
import {getEvaluationToolsMaxSum, getIntermediateCertificationMaxSum} from "./utils";

const mapStateToProps = (state:rootState) => {
    return {
        workProgram: getWorkProgram(state),
        workProgramTitle: getWorkProgramField(state, WorkProgramGeneralFields.TITLE),
        workProgramRating: getWorkProgramField(state, WorkProgramGeneralFields.RATING),
        workProgramRatingId: getWorkProgramField(state, WorkProgramGeneralFields.RATING_ID),
        workProgramStatus: getWorkProgramField(state, 'expertise_status') || 'WK',
        canSendToArchive: isCanArchive(state),
        canAddToFolder: isCanAddToFolder(state),
        canApprove: isCanApprove(state),
        canSendToExpertise: isCanEdit(state),
        canComment: isCanComment(state),
        folders: getFolders(state),
        hoursError: getIsHoursError(state),
        evaluationToolsErrors: getEvaluationToolsMaxSum(getWorkProgramEvaluationToolsList(state))
            + getIntermediateCertificationMaxSum(getWorkProgramIntermediateCertificationList(state)) > 100
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
    // @ts-ignore
    foldersActions: bindActionCreators(folderActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
