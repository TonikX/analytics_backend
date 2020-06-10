import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {rootState} from "../../../../store/reducers";

import actions from "../../actions";
import {getAllSectionsForSelect, isOpenDialog, getDialogData} from '../../getters';
import {WorkProgramActions} from "../../types";
import {fields} from "../../enum";

import literatureActions from '../../../Literature/actions';
import {LiteratureActions} from '../../../Literature/types';
import {getAllCount, getCurrentPage, getLiterature} from "../../../Literature/getters";

const mapStateToProps = (state: rootState) => {
    return {
        literatureList: getLiterature(state),
        sections: getAllSectionsForSelect(state),
        isOpen: isOpenDialog(state, fields.ADD_NEW_LITERATURE),
        selectedItems: getDialogData(state, fields.ADD_NEW_LITERATURE),
        allCount: getAllCount(state),
        currentPage: getCurrentPage(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<WorkProgramActions|LiteratureActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
    // @ts-ignore
    literatureActions: bindActionCreators(literatureActions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
