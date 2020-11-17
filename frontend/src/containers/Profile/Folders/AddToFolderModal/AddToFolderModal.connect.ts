import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";

import {isOpenDialogAddToFolderDialog, getAddToFolderDialogData, getFolders} from '../getters';
import {FolderActions} from "../types";

import {rootState} from "../../../../store/reducers";

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDialogAddToFolderDialog(state),
        data: getAddToFolderDialogData(state),
        folders: getFolders(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<FolderActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
