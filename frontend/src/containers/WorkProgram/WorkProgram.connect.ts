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
} from './getters';

import {rootState} from "../../store/reducers";
import {WorkProgramGeneralFields} from "./enum";
import {getFolders} from "../Profile/Folders/getters";
import folderActions from "../Profile/Folders/actions";
import {
    getValidateProgramErrors
} from "./utils";
import {isFetchingComponentByKey} from "../../layout/getters";

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
        validateErrors: getValidateProgramErrors(state),
        fetchingBars: isFetchingComponentByKey(state, WorkProgramGeneralFields.BARS),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
    foldersActions: bindActionCreators<any, any>(folderActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
