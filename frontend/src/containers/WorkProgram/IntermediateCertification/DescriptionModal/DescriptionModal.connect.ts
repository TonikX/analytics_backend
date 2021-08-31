import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {rootState} from "../../../../store/reducers";

import actions from "../../actions";
import {
    isOpenDialog,
    getDialogData,
    getWorkProgramIntermediateCertification, getWorkProgramId
} from '../../getters';
import {WorkProgramActions} from "../../types";
import {fields} from "../../enum";

import {TrainingEntitiesActions} from '../../../TrainingEntities/types';

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDialog(state, fields.SHOW_INTERMEDIATE_CERTIFICATION_DESCRIPTION),
        evaluationTool: getWorkProgramIntermediateCertification(state),
        workProgramId: getWorkProgramId(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions|TrainingEntitiesActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
