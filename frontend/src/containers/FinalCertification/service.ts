import AnalyticsService from "../../service/analytics-service";
import {CertificationState} from "./types";

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
}

export default CertificationService;