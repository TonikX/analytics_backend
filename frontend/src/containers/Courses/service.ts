import AnalyticsService from "../../service/analytics-service";
import {SortingType, Types} from "../../components/SortingButton/types";

class CoursesServices extends AnalyticsService{
    getCourses(currentPage: number, searchQuery: string, sortingField: string,
        sortingMode: SortingType, platform: string, institution: string, language: string){

        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';
        return this.get(`/api/course/onlinecourse/?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}&platform__title=${platform}&institution__title=${institution}&language=${language}`)
    }
    getPlatforms(searchQuery: string){
        return this.get(`/api/course/platform/?search=${searchQuery}`)
    }
    getInstitutions(searchQuery: string){
        return this.get(`/api/course/institution/?search=${searchQuery}`)
    }
}

export default CoursesServices;