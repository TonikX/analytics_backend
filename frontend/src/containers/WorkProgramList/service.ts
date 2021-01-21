import AnalyticsService from "../../service/analytics-service";
import {SortingType, Types} from "../../components/SortingButton/types";

class WorkProgramListService extends AnalyticsService{
    getWorkPrograms(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/workprograms?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    deleteWorkProgram(id: number){
        return this.delete(`/api/workprogram/delete/${id}`);
    }

    createWorkProgram(workProgram: any){
        return this.post(`/api/workprogram/create`, workProgram);
    }
}

export default WorkProgramListService;