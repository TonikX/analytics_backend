export interface userSettingsActions {
    updateUserEmail: any,
}

export type UpdateEmailPayload = {
    email: string;
    do_email_notifications: boolean;
    expertise_comments_notification: boolean;
    expertise_status_notification: boolean;
};
