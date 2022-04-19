import AnalyticsService from "../../service/analytics-service";

class PracticeListService extends AnalyticsService{
    getPracticeList() {
        return this.get(`/api/practice`)
    }
}

export default PracticeListService;