import AnalyticsService from "../../service/analytics-service";
import {SortingType, Types} from "../../components/SortingButton/types";

class CoursesServices extends AnalyticsService{
    getCourses(currentPage: number, searchQuery: string, sortingField: string,
        sortingMode: SortingType, platform: string, institution: string, language: string, 
        fieldsOfStudyTitle: string, fieldsOfStudyNumber: string){

        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';
        return this.get(`/api/course/onlinecourse/?page=${currentPage}&search=${searchQuery}`
            +`&ordering=${sortingSymbol}${sortingField}&platform__title=${platform}`
            +`&institution__title=${institution}&language=${language}`
            +`&course_field_of_study__field_of_study__number=${fieldsOfStudyNumber}`
            +`&course_field_of_study__field_of_study__title=${fieldsOfStudyTitle}`)
    }
    getPlatforms(searchQuery: string){
        return this.get(`/api/course/platform/?search=${searchQuery}`)
    }
    getInstitutions(searchQuery: string){
        return this.get(`/api/course/institution/?search=${searchQuery}`)
    }
    getFieldsOfStudy(searchQuery: string){
        return this.get(`/api/fieldofstudy/?search=${searchQuery}`)
    }
}

export default CoursesServices;