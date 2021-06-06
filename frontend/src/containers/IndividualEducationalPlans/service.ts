import AnalyticsService from "../../service/analytics-service";
import {SortingType, Types} from "../../components/SortingButton/types";

class Service extends AnalyticsService{
    getIndividualEducationalPlans(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`api/individualization/individual_path/for_this_user/?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    deleteIndividualEducationalPlans(id: number){
        return this.delete(`/api/individualization/individual_path/${id}`);
    }
}

export default Service;