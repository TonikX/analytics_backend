import AnalyticsService from "../../service/analytics-service";
import {MinimalPracticeState, PracticeState} from "./types";

class PracticeService extends AnalyticsService {
    getPracticeList() {
        return this.get(`/api/practice/`)
    }

    createPractice(state: MinimalPracticeState) {
        return this.post(`/api/practice/`, state);
    }

    getPractice(id: number) {
        return this.get(`/api/practice/${id}/`)
    }

    savePractice(practice: PracticeState, id: number) {
        return this.put(`/api/practice/${id}/`, practice);
    }

    patchPractice(fields: any, id: number) {
        return this.patch(`/api/practice/${id}/`, fields);
    }
}

export default PracticeService;