import BaseService from "../../service/base-service";
import {WorkProgramGeneralFields} from "../WorkProgram/enum";
import {SortingType, Types} from "../../components/SortingButton/types";

class WorkProgramListService extends BaseService{
    getWorkPrograms(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/workprograms?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    deleteWorkProgram(id: number){
        return this.delete(`/api/workprogram/delete/${id}`);
    }

    createWorkProgram(workProgram: any){
        const formData = new FormData();

        formData.append(WorkProgramGeneralFields.TITLE, workProgram[WorkProgramGeneralFields.TITLE]);
        formData.append(WorkProgramGeneralFields.CODE, workProgram[WorkProgramGeneralFields.CODE]);
        formData.append(WorkProgramGeneralFields.QUALIFICATION, workProgram[WorkProgramGeneralFields.QUALIFICATION]);

        return this.post(`/api/workprogram/create`, formData);
    }
}

export default WorkProgramListService;