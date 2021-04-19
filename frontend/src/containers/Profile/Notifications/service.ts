import AnalyticsService from "../../../service/analytics-service";

class Service extends AnalyticsService{
    getNotifications(){
        return this.get(`/api/notifications/list`);
    }
}

export default Service;