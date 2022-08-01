import AnalyticsService from "../../service/analytics-service";
import {UpdateEmailPayload} from "./types";

class UserSettingsService extends AnalyticsService {
    updateUserEmail(payload: UpdateEmailPayload) {
        return this.post(`api/email/reset`, {
            ...payload
        });
    }
}

export default UserSettingsService;
