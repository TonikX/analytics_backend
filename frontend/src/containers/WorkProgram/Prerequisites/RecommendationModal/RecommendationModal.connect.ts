import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {rootState} from "../../../../store/reducers";

import actions from "../../actions";
import {isOpenDialog, getRecommendations} from '../../getters';
import {WorkProgramActions} from "../../types";
import {fields} from "../../enum";

import {TrainingEntitiesActions} from '../../../TrainingEntities/types';
import {SubjectAreaActions} from '../../../SubjectArea/types';

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDialog(state, fields.GET_RECOMMENDATIONS),
        recommendations: getRecommendations(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions|TrainingEntitiesActions|SubjectAreaActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
