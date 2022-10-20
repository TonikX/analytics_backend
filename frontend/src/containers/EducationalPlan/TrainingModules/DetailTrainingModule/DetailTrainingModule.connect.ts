import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {rootState} from "../../../../store/reducers";

import actions from "../actions";
import educationPlansActions from "../../actions";

import {getTrainingModule, getModuleRating, getModuleRatingId} from "../getters";
import folderActions from "../../../Profile/Folders/actions";

export const mapStateToProps = (state: rootState) => {
    return {
        module: getTrainingModule(state),
        moduleRating: getModuleRating(state),
        moduleRatingId: getModuleRatingId(state),
        canEdit: true,
    };
};

export const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
    educationPlansActions: bindActionCreators<any, any>(educationPlansActions, dispatch),
    foldersActions: bindActionCreators<any, any>(folderActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
