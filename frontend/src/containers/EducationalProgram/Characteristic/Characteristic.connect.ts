import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {EducationalProgramActions} from "../types";

import {rootState} from "../../../store/reducers";
import {getEducationalProgramCharacteristic, getEducationalProgramCharacteristicCanEdit} from "../getters";

import mainActions from '../../../layout/actions'

const mapStateToProps = (state: rootState) => {
    return {
        educationalProgramCharacteristic: getEducationalProgramCharacteristic(state),
        canEdit: getEducationalProgramCharacteristicCanEdit(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<EducationalProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
    // @ts-ignore
    mainActions: bindActionCreators(mainActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
