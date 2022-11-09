import {getSortingSymbol} from "../../../common/utils";
import AnalyticsService from "../../../service/analytics-service";
import {SortingType} from "../../../components/SortingButton/types";
import {ChangeTrainingModulePayload, CreateTrainingModulePayload} from "./types";
import {TrainingModuleFields} from "./enum";
import {ReactText} from "react";
import {IntermediateCertificationFields} from "../../WorkProgram/enum";

class TrainingModulesService extends AnalyticsService{
    getTrainingModules(currentPage: number, search: string, sortingField: string, sortingMode: SortingType, showOnlyMy: boolean, filters: any){
        const sortingSymbol = getSortingSymbol(sortingMode);
        const filtersString = `id=${filters.id}&module_isu_id__icontains=${filters.isuId}&name__icontains=${filters.name}&descipline_block__name__icontains=${filters.disciplineName}`

        if (showOnlyMy) {
            return this.get(`/api/disciplineblockmodule/list/for_this_user?page=${currentPage}&ordering=${sortingSymbol}${sortingField}&search=${search}&${filtersString}`);
        }

        return this.get(`/api/disciplineblockmodule/list?page=${currentPage}&ordering=${sortingSymbol}${sortingField}&search=${search}&${filtersString}`);
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

    changeTrainingModuleEducationalPrograms(modules: number[], moduleId: number){
        return this.patch(`/api/disciplineblockmodule/update/${moduleId}`, {
            educational_programs_to_access: modules
        });
    }

    addFatherToModule(modules: number[], moduleId: number){
        return this.patch(`/api/disciplineblockmodule/update/${moduleId}`, {
            childs: modules
        });
    }

    deleteIntermediateCertification(id: ReactText){
        return this.delete(`/api/certification_tools/${id}`);
    }

    getIntermediateCertification(id: ReactText){
        return this.get(`/api/certification_tools/${id}`);
    }

    changeIntermediateCertification(evaluationTool: any){
        const id = evaluationTool[IntermediateCertificationFields.ID];

        return this.patch(`/api/certification_tools/${id}`, evaluationTool);
    }

    addIntermediateCertification(evaluationTool: any, moduleId: ReactText){
        return this.post(`/api/certification_tools/`, {
            ...evaluationTool,
            discipline_block_module: moduleId
        });
    }

}

export default TrainingModulesService;
