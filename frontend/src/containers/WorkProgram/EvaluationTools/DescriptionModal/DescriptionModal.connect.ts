import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {rootState} from "../../../../store/reducers";

import actions from "../../actions";
import {isOpenDialog, getDialogData} from '../../getters';
import {WorkProgramActions} from "../../types";
import {fields} from "../../enum";

import {TrainingEntitiesActions} from '../../../TrainingEntities/types';

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDialog(state, fields.SHOW_EVALUATION_TOOLS_DESCRIPTION),
        description: getDialogData(state, fields.SHOW_EVALUATION_TOOLS_DESCRIPTION),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions|TrainingEntitiesActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
