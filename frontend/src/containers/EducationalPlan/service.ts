import BaseService from "../../service/base-service";
import {EducationalPlanFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";

class EducationalPlanService extends BaseService{
    getEducationalPlan(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/academicplan?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    getEducationalPlanDetail(id: number){
        return this.get(`/api/academicplan/detail/${id}`);
    }

    deleteEducationalPlan(id: number){
        return this.delete(`/api/academicplan/delete/${id}`);
    }

    createEducationalPlan(competence: any){
        const formData = new FormData();

        formData.append(EducationalPlanFields.PROFILE, competence[EducationalPlanFields.PROFILE]);
        formData.append(EducationalPlanFields.NUMBER, competence[EducationalPlanFields.NUMBER]);
        formData.append(EducationalPlanFields.APPROVAL_DATE, competence[EducationalPlanFields.APPROVAL_DATE]);

        return this.post(`/api/academicplan`, formData);
    }

    updateEducationalPlan(competence: any){
        const formData = new FormData();
        const id = competence[EducationalPlanFields.ID];

        formData.append(EducationalPlanFields.PROFILE, competence[EducationalPlanFields.PROFILE]);
        formData.append(EducationalPlanFields.NUMBER, competence[EducationalPlanFields.NUMBER]);
        formData.append(EducationalPlanFields.APPROVAL_DATE, competence[EducationalPlanFields.APPROVAL_DATE]);

        return this.put(`/api/academicplan/update/${id}`, formData);
    }
}

export default EducationalPlanService;