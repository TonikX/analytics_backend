import AnalyticsService from "../../service/analytics-service";
import {MinimalPracticeState} from "./types";

class PracticeService extends AnalyticsService{
    getPracticeList() {
        return this.get(`/api/practice/`)
    }

    createPractice(state: MinimalPracticeState) {
        return this.post(`/api/practice/`, state);
    }

    getPractice(id: number) {
        return this.get(`/api/practice/${id}/`)
    }
}

export default PracticeService;