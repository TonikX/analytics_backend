import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import actions from "./actions";

import {rootState} from "../../store/reducers";
import {getUserData} from "../../layout/getters";
import {getConversationList, getMessages, getUnreadMessages} from "./getters";

const mapStateToProps = (state: rootState) => {
    return {
        conversations: getConversationList(state),
        messages: getMessages(state),
        userData: getUserData(state),
        unreadMessages: getUnreadMessages(state),
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    // @ts-ignore
    actions: bindActionCreators(actions, dispatch),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps);
