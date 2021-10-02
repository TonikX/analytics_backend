import AnalyticsService from "../../service/analytics-service";
import {SortingType, Types} from "../../components/SortingButton/types";

class PersonalitiesServices extends AnalyticsService {
    getPersonalities(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType, groups: string) {
        
        const sortingSymbol = sortingMode === Types.ASC ? '-': sortingMode === Types.DESC ? '+': '';
        console.log(searchQuery)
        // console.log("serv:", this.get(`/api/user_management/user_list?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`))
        return this.get(`/api/user_management/user_list?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`)
    }
}

export default PersonalitiesServices;

