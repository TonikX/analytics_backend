import AnalyticsService from "../../service/analytics-service";

class ChatsService extends AnalyticsService{
    getConversations() {
        return this.get(`api/chat/conversations`);
    }

    getMessages(conversationId: number) {
        return this.get(`api/chat/conversation/${conversationId}`);
    }

    getMembers(conversationId: number) {
        return this.get(`api/chat/conversation/${conversationId}/members`);
    }

    getUnreadMessages() {
        return this.get(`api/chat/unread_messages`);
    }

    removeUserFromConversation(conversationId: number, userId: number) {
        return this.delete(`api/chat/conversation/${conversationId}/${userId}`);
    }

    addUserToConversation(conversationId: number, userId: number) {
        return this.post(`api/chat/conversation/${conversationId}/${userId}`, {});
    }

    markMessageAsRead(conversationId: number) {
        return this.post(`api/chat/unread_messages/${conversationId}/read`, {});
    }
}

export default ChatsService;