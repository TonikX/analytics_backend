import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../../actions";
import {getAllSectionsForSelect, isOpenDialog, getDialogData} from '../../getters';
import {WorkProgramActions} from "../../types";

import {rootState} from "../../../../store/reducers";
import {fields} from "../../enum";

const mapStateToProps = (state: rootState) => {
    return {
        courses: [{
            value: '1',
            label: 'course 1'
        },{
            value: '2',
            label: 'course 2'
        },{
            value: '3',
            label: 'course 3'
        }],
        sections: getAllSectionsForSelect(state),
        isOpen: isOpenDialog(state, fields.CREATE_NEW_TOPIC_DIALOG),
        topic: getDialogData(state, fields.CREATE_NEW_TOPIC_DIALOG),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
