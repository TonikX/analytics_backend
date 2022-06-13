import {WithStyles} from "@material-ui/core";
import styles from "./Chats.styles";

export interface chatsState {
    conversations: Array,
    messages: Array,
    unreadMessages: Array,
}

export interface chatsActions {
    getConversations: any,
    setConversations: any;
    getMessages: any,
    setMessages: any;
    getUnreadMessages: any,
    setUnreadMessages: any;
    markMessageAsRead: any;
    getMembers: any,
    setMembers: any;
    addMessage: any;
    leaveConversation: any;
    leaveConversationSuccess: any;
    removeUserFromConversation: any;
    removeUserFromConversationSuccess: any;
    addUserToConversation: any;
    addUserToConversationSuccess: any;
    markMessageAsReadSuccess: any;
}

export interface chatsProps extends WithStyles<typeof styles>{
    actions: chatsActions;
    conversations: Array;
    messages: Array;
    unreadMessages: Array;
}