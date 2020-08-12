import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "./actions";
import {getWorkProgram, getWorkProgramField} from './getters';
import {WorkProgramActions} from "./types";

import {rootState} from "../../store/reducers";
import {WorkProgramGeneralFields} from "./enum";

const mapStateToProps = (state:rootState) => {
    return {
        workProgram: getWorkProgram(state),
        workProgramTitle: getWorkProgramField(state, WorkProgramGeneralFields.TITLE)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
