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

const mapStateToProps = (state: rootState) => {
    return {
        trainingEntities: getTrainingEntitiesForSelect(state),
        sections: getAllSectionsForSelect(state),
        isOpen: isOpenDialog(state, fields.ADD_NEW_PREREQUISITES),
        topic: getDialogData(state, fields.ADD_NEW_PREREQUISITES),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions|TrainingEntitiesActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
    // @ts-ignore
    trainingEntitiesActions: bindActionCreators(trainingEntitiesActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
