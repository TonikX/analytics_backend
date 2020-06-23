import BaseService from "../../service/base-service";
import {DirectionFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";

class EducationalProgramService extends BaseService{
    getEducationalProgram(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/fieldofstudy?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    deleteEducationalProgram(id: number){
        return this.delete(`/api/fieldofstudy/${id}`);
    }

    createEducationalProgram(competence: any){
        const formData = new FormData();

        formData.append(DirectionFields.TITLE, competence[DirectionFields.TITLE]);
        formData.append(DirectionFields.NUMBER, competence[DirectionFields.NUMBER]);
        formData.append(DirectionFields.QUALIFICATION, competence[DirectionFields.QUALIFICATION]);
        formData.append(DirectionFields.EDUCATIONAL_PROFILE, competence[DirectionFields.EDUCATIONAL_PROFILE]);
        formData.append(DirectionFields.FACULTY, competence[DirectionFields.FACULTY]);
        formData.append(DirectionFields.EDUCATION_FORM, competence[DirectionFields.EDUCATION_FORM]);

        return this.post(`/api/fieldofstudy/`, formData);
    }

    updateEducationalProgram(competence: any){
        const formData = new FormData();
        const id = competence[DirectionFields.ID];

        formData.append(DirectionFields.TITLE, competence[DirectionFields.TITLE]);
        formData.append(DirectionFields.NUMBER, competence[DirectionFields.NUMBER]);
        formData.append(DirectionFields.QUALIFICATION, competence[DirectionFields.QUALIFICATION]);
        formData.append(DirectionFields.EDUCATIONAL_PROFILE, competence[DirectionFields.EDUCATIONAL_PROFILE]);
        formData.append(DirectionFields.FACULTY, competence[DirectionFields.FACULTY]);
        formData.append(DirectionFields.EDUCATION_FORM, competence[DirectionFields.EDUCATION_FORM]);

        return this.put(`/api/fieldofstudy/${id}`, formData);
    }
}

export default EducationalProgramService;