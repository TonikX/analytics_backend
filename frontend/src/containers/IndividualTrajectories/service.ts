import AnalyticsService from "../../service/analytics-service";
import {SortingType, Types} from "../../components/SortingButton/types";

class Service extends AnalyticsService{
    getIndividualTrajectories(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType, showOnlyMy: boolean){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        if (showOnlyMy){
            return this.get(`/api/individualization/individual_path/for_this_user/?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
        }

        return this.get(`/api/individualization/individual_path/?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    deleteIndividualTrajectories(id: number){
        return this.delete(`/api/individualization/individual_path/${id}`);
    }
}

export default Service;