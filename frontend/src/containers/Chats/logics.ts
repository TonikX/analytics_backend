import {createLogic} from "redux-logic";
import chatsActions from "./actions";
import Service from './service';
import get from "lodash/get";
import actions from "../../layout/actions";
import {getConversationList} from "./getters";

const service = new Service();

const getChats = createLogic({
    type: chatsActions.getConversations.type,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        dispatch(actions.fetchingTrue({destination: "getConversations"}));

        service.getConversations()
            .then((res) => {
                const conversations = get(res, 'data.results', []);
                dispatch(chatsActions.setConversations(conversations))
                conversations.forEach((conversation: any) => {
                  dispatch(chatsActions.getMembers(conversation.id))
                })
                dispatch(actions.fetchingSuccess());
                dispatch(actions.fetchingFalse({destination: "getConversations"}));
                return done();
            })
    }
});

const getMessages = createLogic({
    type: chatsActions.getMessages.type,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const conversationId = action.payload;
        dispatch(actions.fetchingTrue({destination: "getMessages"}));

        service.getMessages(conversationId)
            .then((res) => {
                const messages = get(res, 'data.results', []);
                dispatch(chatsActions.setMessages(messages))
                dispatch(chatsActions.markMessageAsRead(conversationId))
                dispatch(actions.fetchingSuccess());
                dispatch(actions.fetchingFalse({destination: "getMessages"}));
                return done();
            })
    }
});

const getUnreadMessages = createLogic({
    type: chatsActions.getUnreadMessages.type,
    process({getState, action}: any, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: "getUnreadMessages"}));

        service.getUnreadMessages()
            .then((res) => {
                dispatch(chatsActions.setUnreadMessages(res.data))
                dispatch(actions.setUnreadChatsCount(res.data.length));
                dispatch(actions.fetchingSuccess());
                dispatch(actions.fetchingFalse({destination: "getUnreadMessages"}));
                return done();
            })
    }
});

const getMembers = createLogic({
    type: chatsActions.getMembers.type,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const conversationId = action.payload;
        dispatch(actions.fetchingTrue({destination: "getMembers"}));

        service.getMembers(conversationId)
            .then((res) => {
                const members = get(res, 'data.results', []);
                dispatch(chatsActions.setMembers({members, conversationId}))
                dispatch(actions.fetchingSuccess());
                dispatch(actions.fetchingFalse({destination: "getMembers"}));
                return done();
            })
    }
});

const leaveConversation = createLogic({
    type: chatsActions.leaveConversation.type,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const conversationId = action.payload.conversationId;
        const userId = action.payload.userId;
        dispatch(actions.fetchingTrue({destination: "leaveConversation"}));

        service.removeUserFromConversation(conversationId, userId)
            .then((res) => {
                dispatch(chatsActions.leaveConversationSuccess(conversationId))
                dispatch(actions.fetchingSuccess());
                dispatch(actions.fetchingFalse({destination: "leaveConversation"}));
                return done();
            })
    }
});

const addUserToConversation = createLogic({
    type: chatsActions.addUserToConversation.type,
    process({getState, action}: any, dispatch, done) {
        const state = getState();
        const conversations = getConversationList(state);
        const conversationId = action.payload.conversationId;
        const userId = action.payload.userId;
        dispatch(actions.fetchingTrue({destination: "addUserToConversation"}));

        service.addUserToConversation(conversationId, userId)
            .then((res: any) => {
                dispatch(chatsActions.addUserToConversationSuccess({conversationId, member: res.data}))
                dispatch(actions.fetchingSuccess());
                dispatch(actions.fetchingFalse({destination: "addUserToConversation"}));
                return done();
            })
    }
});

const removeUserFromConversation = createLogic({
    type: chatsActions.removeUserFromConversation.type,
    process({getState, action}: any, dispatch, done) {
        const conversationId = action.payload.conversationId;
        const userId = action.payload.userId;
        dispatch(actions.fetchingTrue({destination: "removeUserFromConversation"}));

        service.removeUserFromConversation(conversationId, userId)
            .then((res) => {
                dispatch(chatsActions.removeUserFromConversationSuccess({conversationId, userId}))
                dispatch(actions.fetchingSuccess());
                dispatch(actions.fetchingFalse({destination: "removeUserFromConversation"}));
                return done();
            })
    }
});

const markMessageAsRead = createLogic({
    type: chatsActions.markMessageAsRead.type,
    process({getState, action}: any, dispatch, done) {
        const conversationId = action.payload;
        dispatch(actions.fetchingTrue({destination: "markMessageAsRead"}));

        service.markMessageAsRead(conversationId)
            .then((res) => {
                dispatch(chatsActions.markMessageAsReadSuccess(conversationId))
                dispatch(actions.decreaseUnreadChatsCount());
                dispatch(actions.fetchingSuccess());
                dispatch(actions.fetchingFalse({destination: "markMessageAsRead"}));
                return done();
            })
    }
});

export default [
    getChats,
    getMessages,
    getMembers,
    getUnreadMessages,
    leaveConversation,
    addUserToConversation,
    removeUserFromConversation,
    markMessageAsRead,
];