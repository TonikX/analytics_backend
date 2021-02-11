import {getSortingSymbol} from "../../../common/utils";
import AnalyticsService from "../../../service/analytics-service";
import {SortingType} from "../../../components/SortingButton/types";
import {ChangeTrainingModulePayload, CreateTrainingModulePayload} from "./types";
import {TrainingModuleFields} from "./enum";

class TrainingModulesService extends AnalyticsService{
    getTrainingModules(currentPage: number, search: string, sortingField: string, sortingMode: SortingType){
        return this.get(`/api/disciplineblockmodule/detail/list?page=${currentPage}&ordering=${getSortingSymbol(sortingMode)}${sortingField}&search=${search}`);
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
}

export default TrainingModulesService;