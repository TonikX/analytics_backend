import BaseService from "../../service/base-service";
import {SortingType, Types} from "../../components/SortingButton/types";

class ExpertisesService extends BaseService{
    getExpertises(currentPage: number, search: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        // @ts-ignore
        return this.get(`/api/skillsofexpertiseingroups?page=${currentPage}&ordering=${sortingSymbol}${sortingField}&search=${search}`);
    }
}

export default ExpertisesService;