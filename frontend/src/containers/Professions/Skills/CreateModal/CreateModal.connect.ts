import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../../actions";

import {isOpenDialog, getDialogData} from '../../getters';
import {ProfessionsActions} from "../../types";

import {rootState} from "../../../../store/reducers";
import trainingEntitiesActions from "../../../TrainingEntities/actions";
import {getTrainingEntitiesForSelect} from "../../../TrainingEntities/getters";

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDialog(state),
        skill: getDialogData(state),
        trainingEntities: getTrainingEntitiesForSelect(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ProfessionsActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
    // @ts-ignore
    trainingEntitiesActions: bindActionCreators(trainingEntitiesActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
