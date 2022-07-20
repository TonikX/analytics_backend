import AnalyticsService from "../../service/analytics-service";

class EmailService extends AnalyticsService{
    sendEmail(text: string, topic: string, users: number[]) {
        return this.post('api/email/send_email', {
            text,
            topic,
            users
        });
    }
}

export default EmailService;
