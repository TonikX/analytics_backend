import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../actions";

import {
    isOpenDialog,
    getFilterField,
    getTrainingModulesList,
    getCurrentPage,
    getAllCount, getDialogData
} from '../getters';
import {rootState} from "../../../../store/reducers";
import {fields} from "../enum";

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDialog(state, fields.ADD_TRAINING_MODULE_DIALOG),
        fatherId: getDialogData(state, fields.ADD_TRAINING_MODULE_DIALOG)?.moduleId,
        connectedModules: getDialogData(state, fields.ADD_TRAINING_MODULE_DIALOG)?.trainingModules,
        filterId: getFilterField(state, fields.FILTER_ID),
        filterModuleIsuId: getFilterField(state, fields.FILTER_MODULE_ISU_ID),
        filterModuleName: getFilterField(state, fields.FILTER_MODULE_NAME),
        filterModuleDisciplineName: getFilterField(state, fields.FILTER_MODULE_DISCIPLINE_NAME),
        filterModuleAvailableForAll: getFilterField(state, fields.FILTER_MODULE_AVAILABLE_FOR_ALL),
        trainingModules: getTrainingModulesList(state),
        currentPage: getCurrentPage(state),
        allCount: getAllCount(state),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
