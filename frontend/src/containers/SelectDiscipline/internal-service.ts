import AnalyticsService from "../../service/analytics-service";

class Service extends AnalyticsService {
    getCorrectWorkPrograms(numbersArray: Array<string>){
        return this.post('/workprogram/getbynumbers',{
            numbers_array: numbersArray,
        });
    }
}

export const service = new Service();

export default Service;