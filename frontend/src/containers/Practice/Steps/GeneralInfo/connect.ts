import {Dispatch} from "react";
import {connect} from 'react-redux';

import {rootState} from "../../../../store/reducers";
import {PracticeActions} from "../../types";
import {getGeneralInfo} from "../../getters";

const mapStateToProps = (state: rootState) => {
    return {
        generalInfo: getGeneralInfo(state),
    }
};

const mapDispatchToProps = (dispatch: Dispatch<PracticeActions>) => ({
});

export default connect(mapStateToProps, mapDispatchToProps);
