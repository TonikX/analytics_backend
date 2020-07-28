import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {WorkProgramActions} from "../../../../WorkProgram/types";
import workProgramActions from "../../../../WorkProgram/actions";

import {rootState} from "../../../../../store/reducers";
import {getResultsForSelect} from "../../../../WorkProgram/getters";

const mapStateToProps = (state: rootState) => {
    return {
        resultsList: getResultsForSelect(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    workProgramActions: bindActionCreators(workProgramActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
