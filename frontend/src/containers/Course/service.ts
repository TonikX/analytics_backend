import AnalyticsService from "../../service/analytics-service";
// import {SortingType, Types} from "../../components/SortingButton/types";

class CoursesServices extends AnalyticsService{
    getCourse(courseId: number){
        return this.get(`/api/course/onlinecourse/${courseId}/`)
    }
}

export default CoursesServices;