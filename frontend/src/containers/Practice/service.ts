import AnalyticsService from "../../service/analytics-service";
import {MinimalPracticeState, PracticeState} from "./types";
import {UserExpertResultEnum} from "../Expertises/enum";
import {ReactText} from "react";
import {PrerequisiteFields} from "../WorkProgram/enum";
import {TrainingEntitiesFields} from "../TrainingEntities/enum";

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

    getComments(expertiseId: number, step: string){
        return this.get(`/api/expertise/comments/${expertiseId}?block=${step}`);
    }

    sendComment(userExpertiseId: number, step: string, comment: string){
        return this.post(`/api/expertise/comments/create`, {
            user_expertise: userExpertiseId,
            comment_block: step,
            comment_text: comment,
        });
    }

    deletePrerequisite(id: ReactText){
        return this.delete(`/api/practice-prerequisites/${id}/`);
    }

    changePrerequisites(prerequisite: any, practiceId: ReactText){
        const formData = new FormData();
        const id = prerequisite[PrerequisiteFields.ID];

        // @ts-ignore
        formData.append('practice', practiceId);

        formData.append(PrerequisiteFields.MASTER_LEVEL, prerequisite[PrerequisiteFields.MASTER_LEVEL]);
        formData.append(PrerequisiteFields.ITEM, prerequisite[PrerequisiteFields.ITEM][TrainingEntitiesFields.ID]);

        return this.patch(`/api/practice-prerequisites/${id}/`, formData);
    }

    addPrerequisites(prerequisite: any, practiceId: ReactText){
        const formData = new FormData();

        // @ts-ignore
        formData.append('practice', practiceId);

        formData.append(PrerequisiteFields.MASTER_LEVEL, prerequisite[PrerequisiteFields.MASTER_LEVEL]);
        formData.append(PrerequisiteFields.ITEM, prerequisite[PrerequisiteFields.ITEM][TrainingEntitiesFields.ID]);

        return this.post(`/api/practice-prerequisites/`, formData);
    }
}

export default PracticeService;
