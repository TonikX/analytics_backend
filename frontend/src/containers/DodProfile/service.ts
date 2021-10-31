import AnalyticsService from "../../service/analytics-service";

class DodProfileService extends AnalyticsService{
    getDodProfile(currentPage: number,) {
        return this.get(`api/workprograms?page=${currentPage}`);
}
}

export default DodProfileService;