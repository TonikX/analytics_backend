import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "../../actions";
import {isOpenAddModuleDialog, getModuleAddDialogData} from '../../getters';

import {rootState} from "../../../../store/reducers";
import {getTrainingModulesListForSelector} from "../../TrainingModules/getters";
import moduleActions from "../../TrainingModules/actions";

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenAddModuleDialog(state),
        module: getModuleAddDialogData(state),
        modulesList: getTrainingModulesListForSelector(state)
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
    moduleActions: bindActionCreators<any, any>(moduleActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
