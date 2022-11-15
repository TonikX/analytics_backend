import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "../actions";
import educationalProgramActions from "../../../EduationPlanInDirection/actions";
import {
    isOpenDialog,
    getAllCount,
    getTrainingModule
} from '../getters';
import {rootState} from "../../../../store/reducers";
import {fields} from "../enum";
import {getFilters, getCurrentPage, getEducationalPlanInDirection} from "../../../EduationPlanInDirection/getters";

const mapStateToProps = (state: rootState) => {
    return {
        isOpen: isOpenDialog(state, fields.ADD_EDUCATIONAL_PROGRAM_DIALOG),
        //@ts-ignore
        selectedPrograms: getTrainingModule(state)?.educational_programs_to_access,
        filters: getFilters(state),
        educationalPrograms: getEducationalPlanInDirection(state),
        currentPage: getCurrentPage(state),
        allCount: getAllCount(state),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
    educationalProgramActions: bindActionCreators<any, any>(educationalProgramActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
