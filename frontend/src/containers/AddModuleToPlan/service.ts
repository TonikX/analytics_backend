import AnalyticsService from "../../service/analytics-service";
import {SortingType, Types} from "../../components/SortingButton/types";
import {getSortingSymbol} from "../../common/utils";

class AddModuleToPlanService extends AnalyticsService {
    getTrainingModules(currentPage: number, search: string, sortingField: string, sortingMode: SortingType, filters: any){
        const sortingSymbol = getSortingSymbol(sortingMode);
        let filtersString = `id=${filters.id}&module_isu_id__icontains=${filters.isuId}&name__icontains=${filters.name}&descipline_block__name__icontains=${filters.disciplineName}`

        filtersString += `&filter_non_struct=${filters.availableForAll}`

        if (filters.moduleId) {
            filtersString += `&id_module_for_filter_struct=${filters.moduleId}`
        }
        if (filters.moduleId) {
            filtersString += `&without_me=${filters.moduleId}`
        }
        if (filters.opId) {
            filtersString += `&allowed_to_add_ap_id=${filters.opId}`
        }

        return this.get(`/api/disciplineblockmodule/list?page=${currentPage}&ordering=${sortingSymbol}${sortingField}&search=${search}&${filtersString}`);
    }

    getEducationalPlan(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/academicplan/short?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    addModuleToPlan(modules: number[], academicPlans: number[], blockName: string, year: number) {
        return this.post(`/api/disciplineblockmodule/insert_to_block_with_ap`, {
            modules,
            discipline_block_name: blockName,
            aps: academicPlans,
            year_for_all_ap: year
        });
    }
}

export default AddModuleToPlanService;
