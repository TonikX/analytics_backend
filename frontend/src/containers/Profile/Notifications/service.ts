import AnalyticsService from "../../../service/analytics-service";

class Service extends AnalyticsService{
    getNotifications(currentPage: number){
        return this.get(`/api/notifications/list?page=${currentPage}`);
    }
}

export default Service;
