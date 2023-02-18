import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {WorkProgramActions} from "../../../../WorkProgram/types";
import {getAllSectionsForSelect} from "../../../../WorkProgram/getters";
import {rootState} from "../../../../../store/reducers";
import {getTrainingEntitiesForSelect} from "../../../../TrainingEntities/getters";
import {getSubjectAreaListForSelect} from "../../../../SubjectArea/getters";
import {TrainingEntitiesActions} from "../../../../TrainingEntities/types";
import trainingEntitiesActions from "../../../../TrainingEntities/actions";
import subjectAreaActions from "../../../../SubjectArea/actions";
import actions from "../../../actions";
import {SubjectAreaActions} from "../../../../SubjectArea/types";
import {getCurrentData, isOpenedDialog} from "../../../getters";
import {DialogType} from "../../../enum";

const mapStateToProps = (state: rootState) => {
    return {
        trainingEntities: getTrainingEntitiesForSelect(state),
        subjectArea: getSubjectAreaListForSelect(state),
        sections: getAllSectionsForSelect(state),
        isOpen: isOpenedDialog(state, DialogType.PREREQUISITES),
        prerequisite: getCurrentData(state, DialogType.PREREQUISITES),
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
