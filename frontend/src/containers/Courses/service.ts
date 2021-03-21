import AnalyticsService from "../../service/analytics-service";
import {SortingType, Types} from "../../components/SortingButton/types";

class CoursesServices extends AnalyticsService{
    getCourses(currentPage: number, searchQuery: string, sortingField: string,
        sortingMode: SortingType, platform: number | '', institution: number | '', language: string){

        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';
        return this.get(`/api/course/onlinecourse/?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}&platform=${platform}&institution=${institution}&language=${language}`)
    }
    getPlatforms(){
        return this.get('/api/course/platform/')
    }
    getInstitutions(){
        return this.get('/api/course/institution/')
    }
}

export default CoursesServices;