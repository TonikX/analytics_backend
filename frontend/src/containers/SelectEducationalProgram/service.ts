import AnalyticsService from "../../service/analytics-service";
import {QualificationType} from "./types";

class Service extends AnalyticsService {
    getProfessions(search?: string, ordering?: string) {
        return this.get('/api/professions/without_pagination')
    }

    getEducationalPrograms(professionIds: Array<number>, qualification: QualificationType) {
        return this.post('/api/EducationalProgram/byprofessionsscience', {
            professions_array: professionIds,
            qualification
        })
    }

    savePrograms(programsIds: Array<number>) {
        return this.post('/api/individualization/save_for_user', {
            implementation_set: programsIds
        })
    }
}

export const service = new Service();
