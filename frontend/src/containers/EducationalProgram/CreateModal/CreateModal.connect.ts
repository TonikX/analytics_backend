import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {rootState} from "../../../store/reducers";

import actions from "../actions";
import {isOpenDialog, getDialogData} from '../getters';
import {EducationalProgramActions} from "../types";

import directionsActions from "../../Direction/actions";
import {DirectionActions} from "../../Direction/types";
import {getDirectionsForSelector} from "../../Direction/getters";

import {EducationalPlanActions} from "../../EducationalPlan/types";
import educationalPlanActions from "../../EducationalPlan/actions";

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDialog(state),
        educationalProgram: getDialogData(state),
        directionList: getDirectionsForSelector(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<EducationalProgramActions|DirectionActions|EducationalPlanActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
    // @ts-ignore
    directionActions: bindActionCreators(directionsActions, dispatch),
    // @ts-ignore
    educationalPlanActions: bindActionCreators(educationalPlanActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
