import AnalyticsService from "../../service/analytics-service";
import {CertificationState} from "./types";
import {UserExpertResultEnum} from "../Expertises/enum";

class CertificationService extends AnalyticsService {

    getCertificationList(searchText: string, sortingField: string, currentPage: number) {
        return this.get(`/api/gia/?search=${searchText}&ordering=${sortingField}&page=${currentPage}`)
    }

    getCertification(id: number) {
        return this.get(`/api/gia/${id}/`)
    }

    saveCertification(certification: CertificationState, id: number) {
        return this.put(`/api/gia/${id}/`, certification);
    }

    patchCertification(fields: any, id: number) {
        return this.patch(`/api/gia/${id}/`, fields);
    }

    patchMarkCriteria(fields: any, id: number) {
        return this.patch(`/api/gia/vkr_criteria/${id}/`, fields);
    }

    getTemplateText(id: number) {
        return this.get(`/api/gia/gia_template/${id}/`)
    }

    createCertification(state: CertificationState) {
        return this.post(`/api/gia/`, state);
    }

    createExpertise(giaId: number) {
        return this.post(`/api/expertise/create`, {gia: giaId, ['expertise_type']: 'GIA'})
    }

    sendCertificationToWork(userExpertiseId: number){
        return this.patch(`/api/expertise/user/update/${userExpertiseId}`, {
            user_expertise_status: UserExpertResultEnum.REWORK,
        });
    }

    approveCertification(userExpertiseId: number){
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
}

export default CertificationService;