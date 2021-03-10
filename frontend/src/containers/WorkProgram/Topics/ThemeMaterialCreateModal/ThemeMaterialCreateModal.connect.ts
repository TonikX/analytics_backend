import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {rootState} from "../../../../store/reducers";

import actions from "../../actions";
import {isOpenDialog, getDialogData} from '../../getters';
import {fields} from "../../enum";

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDialog(state, fields.ADD_NEW_MATERIAL_TO_TOPIC),
        data: getDialogData(state, fields.ADD_NEW_MATERIAL_TO_TOPIC),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
