import AnalyticsService from "../../service/analytics-service";
import {UpdateEmailPayload, UpdateUserDataPayload} from "./types";

class UserSettingsService extends AnalyticsService {
    updateUserEmail(payload: UpdateEmailPayload) {
        return this.post(`api/email/reset`, {
            ...payload
        });
    }

    updateUserData(payload: UpdateUserDataPayload) {
        return this.patch(`auth/users/me/`, {
            ...payload
        });
    }
}

export default UserSettingsService;
