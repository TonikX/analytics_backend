export interface userSettingsActions {
    updateUserEmail: any,
    updateUserData: any,
}

export type UpdateEmailPayload = {
    email: string;
};

export type UpdateUserDataPayload = {
    email: string;
    do_email_notifications: notificationsAgree;
    expertise_comments_notification: commentsAgree;
    expertise_status_notification: statusAgree;
}
