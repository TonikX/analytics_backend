import AnalyticsService from "../../service/analytics-service";

class DodProfileService extends AnalyticsService{
    getUserWorkPrograms(currentPage: number) {
        return this.get(`api/workprograms?page=${currentPage}&filter=my`);
    }
}

export default DodProfileService;