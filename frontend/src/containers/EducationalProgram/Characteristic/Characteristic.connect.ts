import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";
import {EducationalProgramActions} from "../types";

import {rootState} from "../../../store/reducers";
import {getEducationalProgramCharacteristic} from "../getters";

const mapStateToProps = (state: rootState) => {
    return {
        educationalProgramCharacteristic: getEducationalProgramCharacteristic(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<EducationalProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
