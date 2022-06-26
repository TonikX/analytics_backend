import {Dispatch} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "./actions";
import {
    getAcademicPlanUpdateLogs,
    getUpdatedAcademicPlans,
    getSchedulerConfiguration,
    getLogsCurrentPage,
    getLogsSearchQuery,
    getLogsAllCount,
    getLogsSortingField,
    getLogsSortingMode,
    getUpdatedPlansSearchQuery,
    getUpdatedPlansAllCount,
    getUpdatedPlansCurrentPage,
    getUpdatedPlansSortingField,
    getUpdatedPlansSortingMode
} from './getters';
import {AcademicPlanUpdateActions} from "./types";

import {rootState} from "../../store/reducers";

const mapStateToProps = (state: rootState) => {
    return {
        academicPlanUpdateLogs: getAcademicPlanUpdateLogs(state),
        updatedAcademicPlans: getUpdatedAcademicPlans(state),
        schedulerConfiguration: getSchedulerConfiguration(state),
        logsCurrentPage: getLogsCurrentPage(state),
        logsSearchQuery: getLogsSearchQuery(state),
        logsAllCount: getLogsAllCount(state),
        logsSortingField: getLogsSortingField(state),
        logsSortingMode: getLogsSortingMode(state),
        updatedPlansCurrentPage: getUpdatedPlansCurrentPage(state),
        updatedPlansSearchQuery: getUpdatedPlansSearchQuery(state),
        updatedPlansAllCount: getUpdatedPlansAllCount(state),
        updatedPlansSortingField: getUpdatedPlansSortingField(state),
        updatedPlansSortingMode: getUpdatedPlansSortingMode(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AcademicPlanUpdateActions>) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
