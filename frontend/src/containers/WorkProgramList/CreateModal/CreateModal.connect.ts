import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {isOpenDialog} from '../getters';
import {WorkProgramListActions} from "../types";

import {rootState} from "../../../store/reducers";
import {getStructuralUnitsForSelector} from "../../StructuralUnits/getters";
import {getWorkProgramField} from "../../WorkProgram/getters";
import {WorkProgramGeneralFields} from "../../WorkProgram/enum";
import structuralUnitActions from "../../StructuralUnits/actions";

const mapStateToProps = (state: rootState) => {
    return {
        structuralUnit: getWorkProgramField(state, WorkProgramGeneralFields.STRUCTURAL_UNIT),
        structuralUnitsList: getStructuralUnitsForSelector(state),
        isOpen: isOpenDialog(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramListActions>) => ({
    // @ts-ignore
    structuralUnitActions: bindActionCreators<any, any>(structuralUnitActions, dispatch),
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
