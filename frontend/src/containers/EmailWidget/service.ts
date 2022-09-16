import AnalyticsService from "../../service/analytics-service";

class EmailService extends AnalyticsService{
    sendEmail(text: string, topic: string, users: number[], send_to_all: boolean) {
        return this.post('api/email/send_email', {
            text,
            topic,
            users,
            send_to_all
        });
    }
}

export default EmailService;
