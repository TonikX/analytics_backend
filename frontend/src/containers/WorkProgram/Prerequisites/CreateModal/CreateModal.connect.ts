import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {rootState} from "../../../../store/reducers";

import actions from "../../actions";
import {getAllSectionsForSelect, isOpenDialog, getDialogData} from '../../getters';
import {WorkProgramActions} from "../../types";
import {fields} from "../../enum";

import trainingEntitiesActions from '../../../TrainingEntities/actions';
import {TrainingEntitiesActions} from '../../../TrainingEntities/types';
import {getTrainingEntitiesForSelect} from "../../../TrainingEntities/getters";

import subjectAreaActions from '../../../SubjectArea/actions';
import {SubjectAreaActions} from '../../../SubjectArea/types';
import {getSubjectAreaListForSelect} from "../../../SubjectArea/getters";

const mapStateToProps = (state: rootState) => {
    return {
        trainingEntities: getTrainingEntitiesForSelect(state),
        subjectArea: getSubjectAreaListForSelect(state),
        sections: getAllSectionsForSelect(state),
        isOpen: isOpenDialog(state, fields.ADD_NEW_PREREQUISITES),
        prerequisite: getDialogData(state, fields.ADD_NEW_PREREQUISITES),
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
