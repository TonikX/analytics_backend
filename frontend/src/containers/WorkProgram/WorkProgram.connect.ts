import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "./actions";
import {
    getWorkProgram,
    getWorkProgramField,
    isCanApprove,
    isCanArchive,
    isCanComment,
    isCanSendToIsu,
    isCanEdit,
    isCanAddToFolder,
    getWorkProgramNotificationsUnread,
    getExpertiseLogAccept,
} from './getters';

import {rootState} from "../../store/reducers";
import {WorkProgramGeneralFields} from "./enum";
import {getFolders} from "../Profile/Folders/getters";
import folderActions from "../Profile/Folders/actions";
import {
    getValidationErrors
} from "./validation";
import {isFetchingComponentByKey} from "../../layout/getters";

const mapStateToProps = (state:rootState) => {
    return {
        workProgram: getWorkProgram(state),
        expertiseLogAccept: getExpertiseLogAccept(state),
        workProgramTitle: getWorkProgramField(state, WorkProgramGeneralFields.TITLE),
        workProgramRating: getWorkProgramField(state, WorkProgramGeneralFields.RATING),
        workProgramRatingId: getWorkProgramField(state, WorkProgramGeneralFields.RATING_ID),
        workProgramStatus: getWorkProgramField(state, 'expertise_status') || getWorkProgramField(state, 'work_status'),
        notificationsRead: getWorkProgramNotificationsUnread(state),
        canSendToArchive: isCanArchive(state),
        canAddToFolder: isCanAddToFolder(state),
        canApprove: isCanApprove(state),
        canSendToIsu: isCanSendToIsu(state),
        canSendToExpertise: isCanEdit(state),
        canComment: isCanComment(state),
        folders: getFolders(state),
        validateErrors: getValidationErrors(state),
        fetchingBars: isFetchingComponentByKey(state, WorkProgramGeneralFields.BARS),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
    foldersActions: bindActionCreators<any, any>(folderActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
