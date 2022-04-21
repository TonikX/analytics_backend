import {Dispatch} from "react";
import {connect} from 'react-redux';

import {rootState} from "../../../../store/reducers";
import {PracticeActions} from "../../types";

const mapStateToProps = (state: rootState) => {
};

const mapDispatchToProps = (dispatch: Dispatch<PracticeActions>) => ({
});

export default connect(mapStateToProps, mapDispatchToProps);
