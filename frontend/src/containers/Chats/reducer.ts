import {chatsState} from "./types";
import createReducer from "../../store/createReducer";
import actions from "./actions";

export const GENERAL_PATH = 'Chats';

export const initialState: chatsState = {
    conversations: [],
    messages: [],
    unreadMessages: [],
}

const setConversations = (state: chatsState, {payload}: any): chatsState => ({
    ...state,
    conversations: payload
});

const setMessages = (state: chatsState, {payload}: any): chatsState => ({
    ...state,
    messages: payload
});

const setUnreadMessages = (state: chatsState, {payload}: any): chatsState => ({
    ...state,
    unreadMessages: payload
});

const setMembers = (state: chatsState, {payload}: any): chatsState => ({
    ...state,
    conversations: state.conversations.map((conversation: any) => {
        if (conversation.id === payload.conversationId) {
            return {
                ...conversation,
                members: payload.members
            }
        }
        return conversation
    })
});

const addMessage = (state: chatsState, {payload}: any): chatsState => ({
    ...state,
    messages: [
        ...state.messages,
        payload
    ]
});

const leaveConversationSuccess = (state: chatsState, {payload}: any): chatsState => ({
    ...state,
    conversations: state.conversations.filter((conversation: any) => conversation.id != payload)
});

const addUserToConversationSuccess = (state: chatsState, {payload}: any): chatsState => ({
    ...state,
    conversations: state.conversations.map((conversation: any) => {
        if (conversation.id === payload.conversationId) {
            return {
                ...conversation,
                members: [
                    ...conversation.members,
                    payload.member
                ]
            }
        }
        return conversation
    })
});

const removeUserFromConversationSuccess = (state: chatsState, {payload}: any): chatsState => ({
    ...state,
    conversations: state.conversations.map((conversation: any) => {
        if (conversation.id === payload.conversationId) {
            return {
                ...conversation,
                members: conversation.members.filter((member: any) => member.user.id !== payload.userId)
            }
        }
        return conversation
    })
});

const markMessageAsReadSuccess = (state: chatsState, {payload}: any): chatsState => ({
    ...state,
    unreadMessages: state.unreadMessages.filter((id: number) => id !== payload)
});

export const reducer = createReducer(initialState, {
    [actions.setConversations.type]: setConversations,
    [actions.setMessages.type]: setMessages,
    [actions.addMessage.type]: addMessage,
    [actions.setUnreadMessages.type]: setUnreadMessages,
    [actions.setMembers.type]: setMembers,
    [actions.leaveConversationSuccess.type]: leaveConversationSuccess,
    [actions.addUserToConversationSuccess.type]: addUserToConversationSuccess,
    [actions.removeUserFromConversationSuccess.type]: removeUserFromConversationSuccess,
    [actions.markMessageAsReadSuccess.type]: markMessageAsReadSuccess,
})