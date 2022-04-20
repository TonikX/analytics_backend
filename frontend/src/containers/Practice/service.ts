import AnalyticsService from "../../service/analytics-service";
import {MinimalPracticeState} from "./types";

class PracticeService extends AnalyticsService{
    getPracticeList() {
        return this.get(`/api/practice/`)
    }

    createPractice(state: MinimalPracticeState) {
        return this.post(`/api/practice/`, state);
    }
}

export default PracticeService;