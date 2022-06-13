import {chatsActions} from "./types";
import {createAction} from "@reduxjs/toolkit";

const getConversations = createAction('GET_CONVERSATIONS');
const setConversations = createAction('SET_CONVERSATIONS');

const getMessages = createAction('GET_MESSAGES');
const setMessages = createAction('SET_MESSAGES');
const addMessage = createAction('ADD_MESSAGE');

const getUnreadMessages = createAction('GET_UNREAD_MESSAGES');
const setUnreadMessages = createAction('SET_UNREAD_MESSAGES');
const markMessageAsRead = createAction('MARK_MESSAGES_AS_READ');
const markMessageAsReadSuccess = createAction('MARK_MESSAGES_AS_READ_SUCCESS');

const getMembers = createAction('GET_MEMBERS');
const setMembers = createAction('SET_MEMBERS');

const leaveConversation = createAction('LEAVE_CONVERSATION');
const leaveConversationSuccess = createAction('LEAVE_CONVERSATION_SUCCESS');

const removeUserFromConversation = createAction('REMOVE_USER_FROM_CONVERSATION');
const removeUserFromConversationSuccess = createAction('REMOVE_USER_FROM_CONVERSATION_SUCCESS');

const addUserToConversation = createAction('ADD_USER_TO_CONVERSATION');
const addUserToConversationSuccess = createAction('ADD_USER_TO_CONVERSATION_SUCCESS');

const actions: chatsActions = {
    getConversations,
    setConversations,
    getMessages,
    setMessages,
    addMessage,
    getUnreadMessages,
    setUnreadMessages,
    markMessageAsRead,
    markMessageAsReadSuccess,
    getMembers,
    setMembers,
    leaveConversation,
    leaveConversationSuccess,
    removeUserFromConversation,
    removeUserFromConversationSuccess,
    addUserToConversation,
    addUserToConversationSuccess,
}

export default actions;