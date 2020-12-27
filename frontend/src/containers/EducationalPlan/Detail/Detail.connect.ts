import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {getEducationalPlanDetail, getEducationalPlanDetailBlocks} from '../getters';
import {EducationalPlanActions} from "../types";

import {rootState} from "../../../store/reducers";
import folderActions from "../../Profile/Folders/actions";

const mapStateToProps = (state: rootState) => {
    return {
        detailPlan: getEducationalPlanDetail(state),
        blocks: getEducationalPlanDetailBlocks(state),
        types: getEducationalPlanDetailBlocks(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<EducationalPlanActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
    // @ts-ignore
    foldersActions: bindActionCreators(folderActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
