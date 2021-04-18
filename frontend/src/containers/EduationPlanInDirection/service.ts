import AnalyticsService from "../../service/analytics-service";
import {EducationPlanInDirectionFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";
import {EducationalPlanFields} from "../EducationalPlan/enum";
import {DirectionFields} from "../Direction/enum";

class Service extends AnalyticsService{
    getEducationalPlansInDirection(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/implementationacademicplan?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    deleteEducationalPlansInDirection(id: number){
        return this.delete(`/api/implementationacademicplan/delete/${id}`);
    }

    createEducationalPlansInDirection(educationalPlansInDirection: any){
        const formData = new FormData();
        // @ts-ignore
        formData.append(EducationPlanInDirectionFields.YEAR, parseInt(educationalPlansInDirection[EducationPlanInDirectionFields.YEAR]));
        formData.append(EducationPlanInDirectionFields.DIRECTION, educationalPlansInDirection[EducationPlanInDirectionFields.DIRECTION][DirectionFields.ID]);
        formData.append(EducationPlanInDirectionFields.EDUCATION_PLAN, educationalPlansInDirection[EducationPlanInDirectionFields.EDUCATION_PLAN][EducationalPlanFields.ID]);

        return this.post(`/api/implementationacademicplan/create`, formData);
    }

    updateEducationalPlansInDirection(educationalPlansInDirection: any){
        const formData = new FormData();
        const id = educationalPlansInDirection[EducationPlanInDirectionFields.ID];

        formData.append(EducationPlanInDirectionFields.YEAR, educationalPlansInDirection[EducationPlanInDirectionFields.YEAR]);
        formData.append(EducationPlanInDirectionFields.DIRECTION, educationalPlansInDirection[EducationPlanInDirectionFields.DIRECTION][DirectionFields.ID]);
        formData.append(EducationPlanInDirectionFields.EDUCATION_PLAN, educationalPlansInDirection[EducationPlanInDirectionFields.EDUCATION_PLAN][EducationalPlanFields.ID]);

        return this.put(`/api/implementationacademicplan/update/${id}`, formData);
    }

    createIndividualEducationalPlan(id: number){
        return this.post(`/api/individualization/individual_path/`, {
            user: 1,
            comment: '',
            implementation_of_academic_plan: id
        });
    }
}

export default Service;