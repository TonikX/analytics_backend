import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {rootState} from "../../../store/reducers";

import actions from "./actions";
import {FolderActions} from "./types";
import {getFolders} from "./getters";

const mapStateToProps = (state: rootState) => {
    return {
        folders: getFolders(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<FolderActions>) => ({
// @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
