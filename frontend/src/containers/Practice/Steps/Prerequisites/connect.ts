import {connect} from 'react-redux';

import {rootState} from "../../../../store/reducers";
import {getPermissionsInfo, getPractice, getTemplateText} from "../../getters";
import {bindActionCreators} from "redux";
import actions from "../../actions";
import {getWorkProgramField} from "../../../WorkProgram/getters";
import {fields} from "../../../WorkProgram/enum";

const mapStateToProps = (state: rootState) => {
    return {
        fields: getPractice(state),
        templateText: getTemplateText(state),
        prerequisitesList: getWorkProgramField(state, fields.WORK_PROGRAM_PREREQUISITES) || [],
        permissionsInfo: getPermissionsInfo(state),
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
