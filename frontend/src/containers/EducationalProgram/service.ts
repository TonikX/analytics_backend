import BaseService from "../../service/base-service";
import {SortingType, Types} from "../../components/SortingButton/types";
import {EducationProgramFields} from "./enum";

class Service extends BaseService{
    getEducationalProgramList(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/EducationalProgram?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    deleteEducationProgram(id: number){
        return this.delete(`/api/EducationalProgram/delete/${id}`);
    }

    deleteEducationalProgramCharacteristic(id: number){
        return this.delete(`/api/implementationacademicplan/delete/${id}`);
    }

    getEducationalProgramCharacteristic(id: number){
        return this.get(`/api/GeneralCharacteristics/detail_with_educational_program/${id}`);
    }

    createEducationProgram(program: any){
        return this.post(`/api/EducationalProgram/create`, {
            "academic_plan_for_ep": program[EducationProgramFields.ACADEMIC_PLAN_FOR_EP][EducationProgramFields.ID],
            "qualification": program[EducationProgramFields.QUALIFICATION],
            "manager": program[EducationProgramFields.MANAGER],
            "year_of_recruitment": program[EducationProgramFields.YEAR],
        });
    }

    updateEducationProgram(id: any, payload: any){
        return this.patch(`/api/EducationalProgram/update/${id}`, payload);
    }

    updateEducationProgramCharacteristic(id: any, payload: any){
        return this.patch(`/api/GeneralCharacteristics/update/${id}`, payload);
    }
}

export default Service;