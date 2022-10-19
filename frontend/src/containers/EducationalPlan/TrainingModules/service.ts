import {getSortingSymbol} from "../../../common/utils";
import AnalyticsService from "../../../service/analytics-service";
import {SortingType} from "../../../components/SortingButton/types";
import {ChangeTrainingModulePayload, CreateTrainingModulePayload} from "./types";
import {TrainingModuleFields} from "./enum";

class TrainingModulesService extends AnalyticsService{
    getTrainingModules(currentPage: number, search: string, sortingField: string, sortingMode: SortingType, showOnlyMy: boolean){
        const sortingSymbol = getSortingSymbol(sortingMode);

        if (showOnlyMy) {
            return this.get(`/api/disciplineblockmodule/detail/list/for_this_user?page=${currentPage}&ordering=${sortingSymbol}${sortingField}&search=${search}`);
        }

        return this.get(`/api/disciplineblockmodule/detail/list?page=${currentPage}&ordering=${sortingSymbol}${sortingField}&search=${search}`);
    }

    getTrainingModule(id: number){
        return this.get(`/api/disciplineblockmodule/detail/${id}`);
    }

    deleteTrainingModule(id: number){
        return this.delete(`/api/disciplineblockmodule/delete/${id}`);
    }

    createTrainingModule(payload: CreateTrainingModulePayload){
        return this.post(`/api/disciplineblockmodule/create`, payload.data);
    }

    changeTrainingModule(payload: ChangeTrainingModulePayload){
        return this.patch(`/api/disciplineblockmodule/update/${payload.data[TrainingModuleFields.ID]}`, payload.data);
    }

    removeFatherFromModule(id: number){
        return this.patch(`/api/disciplineblockmodule/update/${id}`, {
            father: null
        });
    }
}

export default TrainingModulesService;
