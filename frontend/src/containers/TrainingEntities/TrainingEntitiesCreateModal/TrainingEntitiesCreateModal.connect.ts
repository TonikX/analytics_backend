import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import subjectAreaActions from "../../SubjectArea/actions";

import {isOpenDialog, getDialogData} from '../getters';
import {TrainingEntitiesActions} from "../types";

import {rootState} from "../../../store/reducers";
import {getSubjectAreaListForSelect} from "../../SubjectArea/getters";

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDialog(state),
        trainingModule: getDialogData(state),
        subjectAreaList: getSubjectAreaListForSelect(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<TrainingEntitiesActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
    // @ts-ignore
    subjectAreaActions: bindActionCreators(subjectAreaActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
