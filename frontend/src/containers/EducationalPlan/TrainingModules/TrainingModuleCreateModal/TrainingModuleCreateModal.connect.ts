import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";

import {isOpenDialog, getDialogData} from '../getters';
import {rootState} from "../../../../store/reducers";
import {fields} from "../enum";

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDialog(state, fields.CREATE_TRAINING_MODULE_DIALOG),
        trainingModule: getDialogData(state, fields.CREATE_TRAINING_MODULE_DIALOG),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
