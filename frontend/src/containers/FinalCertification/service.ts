import AnalyticsService from "../../service/analytics-service";
import {CertificationState} from "./types";

class CertificationService extends AnalyticsService {

    getCertification(id: number) {
        return this.get(`/api/gia/${id}/`)
    }

    saveCertification(certification: CertificationState, id: number) {
        return this.put(`/api/gia/${id}/`, certification);
    }

    patchCertification(fields: any, id: number) {
        return this.patch(`/api/practice/${id}/`, fields);
    }
}

export default CertificationService;