import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";

import {isOpenDialog, getDialogData} from '../getters';
import {rootState} from "../../../../store/reducers";

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDialog(state),
        trainingModule: getDialogData(state),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
