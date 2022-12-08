import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {getIsModalOpen} from '../getters';

import {rootState} from "../../../../store/reducers";
import {CertificationListActions} from "../types";
import structuralUnitActions from "../../../StructuralUnits/actions";
import {getWorkProgramField} from "../../../WorkProgram/getters";
import {WorkProgramGeneralFields} from "../../../WorkProgram/enum";
import {getStructuralUnitsForSelector} from "../../../StructuralUnits/getters";

const mapStateToProps = (state: rootState) => {
    return {
        structuralUnit: getWorkProgramField(state, WorkProgramGeneralFields.STRUCTURAL_UNIT),
        structuralUnitsList: getStructuralUnitsForSelector(state),
        isOpen: getIsModalOpen(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<CertificationListActions>) => ({
    // @ts-ignore
    structuralUnitActions: bindActionCreators<any, any>(structuralUnitActions, dispatch),
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
