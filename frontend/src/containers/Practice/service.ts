import AnalyticsService from "../../service/analytics-service";
import {MinimalPracticeState, PracticeState} from "./types";
import {UserExpertResultEnum} from "../Expertises/enum";

class PracticeService extends AnalyticsService {
    getPracticeList(searchText: string, sortingField: string, currentPage: number) {
        return this.get(`/api/practice/?search=${searchText}&ordering=${sortingField}&page=${currentPage}`)
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

    getTemplateText(id: number) {
        return this.get(`/api/practice/practice_template/${id}/`)
    }

    createExpertise(practiceId: number) {
        return this.post(`/api/expertise/create`, {practice: practiceId, ['expertise_type']: 'PRAC'})
    }

    sendPracticeToWork(userExpertiseId: number){
        return this.patch(`/api/expertise/user/update/${userExpertiseId}`, {
            user_expertise_status: UserExpertResultEnum.REWORK,
        });
    }

    approvePractice(userExpertiseId: number){
        return this.patch(`/api/expertise/user/update/${userExpertiseId}`, {
            user_expertise_status: UserExpertResultEnum.APPROVED,
        });
    }
}

export default PracticeService;