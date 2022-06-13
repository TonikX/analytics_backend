import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "./actions";
import {
    isFetching,
    getErrors,
    getSuccessMessages,
    getAuth,
    getUserGroups,
    isFetchingByKey,
    getMockMenu,
    getNotificationCount,
    getUnreadChatsCount,
} from './getters';
const mapStateToProps = (state) => {
    return {
        fetching: isFetching(state),
        isFetchingRefreshToken: isFetchingByKey(state, 'refresh'),
        errors: getErrors(state),
        successMessages: getSuccessMessages(state),
        auth: getAuth(state),
        userGroups: getUserGroups(state),
        mockMenu: getMockMenu(state),
        notificationsCount: getNotificationCount(state),
        unreadChatsCount: getUnreadChatsCount(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
