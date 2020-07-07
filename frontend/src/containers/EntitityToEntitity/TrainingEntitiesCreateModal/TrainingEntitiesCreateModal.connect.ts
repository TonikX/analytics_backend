import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import trainingEntitiesActions from "../../TrainingEntities/actions";

import {isOpenDialog, getDialogData} from '../getters';
import {EntityToEntityActions} from "../types";

import {rootState} from "../../../store/reducers";
import {getTrainingEntitiesForSelect} from "../../TrainingEntities/getters";

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDialog(state),
        trainingEntity: getDialogData(state),
        trainingEntitiesList: getTrainingEntitiesForSelect(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<EntityToEntityActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
    // @ts-ignore
    trainingEntitiesActions: bindActionCreators(trainingEntitiesActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
