import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";


import actions from "../../../actions";
import {getTrainingEntitiesForSelect} from "../../../../TrainingEntities/getters";
import trainingEntitiesActions from "../../../../TrainingEntities/actions";
import subjectAreaActions from "../../../../SubjectArea/actions";
import {rootState} from "../../../../../store/reducers";
import {getSubjectAreaListForSelect} from "../../../../SubjectArea/getters";
import {TrainingEntitiesActions} from "../../../../TrainingEntities/types";
import {SubjectAreaActions} from "../../../../SubjectArea/types";
import {WorkProgramActions} from "../../../../WorkProgram/types";
import {getCurrentData, isOpenedDialog} from "../../../getters";
import {DialogType} from "../../../enum";

const mapStateToProps = (state: rootState) => {
    return {
        trainingEntities: getTrainingEntitiesForSelect(state),
        subjectArea: getSubjectAreaListForSelect(state),
        isOpen: isOpenedDialog(state, DialogType.RESULTS),
        result: getCurrentData(state, DialogType.RESULTS),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions|TrainingEntitiesActions|SubjectAreaActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
    // @ts-ignore
    trainingEntitiesActions: bindActionCreators(trainingEntitiesActions, dispatch),
    // @ts-ignore
    subjectAreaActions: bindActionCreators(subjectAreaActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
