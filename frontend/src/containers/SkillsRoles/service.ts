import AnalyticsService from "../../service/analytics-service";
import {SortingType, Types} from "../../components/SortingButton/types";

class RolesService extends AnalyticsService{
    getRoles(currentPage: number, search: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        // @ts-ignore
        return this.get(`/api/skillsofroleingroups?page=${currentPage}&ordering=${sortingSymbol}${sortingField}&search=${search}`);
    }
}

export default RolesService;