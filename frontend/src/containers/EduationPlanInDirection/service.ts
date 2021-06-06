import AnalyticsService from "../../service/analytics-service";
import {EducationPlanInDirectionFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";
import {EducationalPlanFields} from "../EducationalPlan/enum";
import {DirectionFields} from "../Direction/enum";
import {filterFields} from "./enum";

class Service extends AnalyticsService{
    getEducationalPlansInDirection(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType, filters: any){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';
        const qualification = `field_of_study__qualification=${filters[filterFields.SPECIALIZATION]}`;
        const outcomes = `academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__outcomes__id=${filters[filterFields.OUTCOMES]}`
        const prerequisite = `academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__prerequisites__id=${filters[filterFields.PREREQUISITE]}`
        const structuralUnit = `academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__structural_unit__title=${filters[filterFields.STRUCTURAL_UNIT]}`
        const numberDp = `field_of_study__number=${filters[filterFields.NUMBER_DP]}`
        const nameDp  =`field_of_study__title=${filters[filterFields.NAME_DP]}`

        return this.get(`/api/implementationacademicplan?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}&${qualification}&${outcomes}&${prerequisite}&${structuralUnit}&${numberDp}&${nameDp}`);
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