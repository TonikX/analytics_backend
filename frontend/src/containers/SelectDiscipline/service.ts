import OreshinService from "../../service/oreshin-service";
import {QualificationType} from "./types";

class Service extends OreshinService {
    getKeywords(semester: number, qualification: QualificationType){
        return this.post('/get_available_keywords', this.createPostObject({
            semester: semester,
            level: qualification
        }));
    }

    getWorkPrograms(keywords: Array<string>, semester: number, qualification: QualificationType){
        return this.post('/get_disciplines', this.createPostObject({
            semester: semester,
            level: qualification,
            keywords: keywords,
            top_n: 10
        }));
    }
}

export const service = new Service();

export default Service;
