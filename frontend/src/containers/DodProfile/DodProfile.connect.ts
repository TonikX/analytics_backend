import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import actions from "./actions";
import {getAllCount, getCurrentPage, getTableMode, getUserGroups, getUserName, getWorkProgramList} from "./getters";

const mapStateToProps = (state: any) => {
    return {
        workProgramList: getWorkProgramList(state),
        allCount: getAllCount(state),
        currentPage: getCurrentPage(state),
        tableMode: getTableMode(state),
        userName: getUserName(state),
        userGroups: getUserGroups(state),

    }
}


const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators<any, any>(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);