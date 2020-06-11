import BaseService from "../../service/base-service";
import {EducationalProgramFields} from "./enum";
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

        formData.append(EducationalProgramFields.TITLE, competence[EducationalProgramFields.TITLE]);
        formData.append(EducationalProgramFields.NUMBER, competence[EducationalProgramFields.NUMBER]);
        formData.append(EducationalProgramFields.QUALIFICATION, competence[EducationalProgramFields.QUALIFICATION]);
        formData.append(EducationalProgramFields.EDUCATIONAL_PROFILE, competence[EducationalProgramFields.EDUCATIONAL_PROFILE]);
        formData.append(EducationalProgramFields.FACULTY, competence[EducationalProgramFields.FACULTY]);
        formData.append(EducationalProgramFields.EDUCATION_FORM, competence[EducationalProgramFields.EDUCATION_FORM]);

        return this.post(`/api/fieldofstudy/`, formData);
    }

    updateEducationalProgram(competence: any){
        const formData = new FormData();
        const id = competence[EducationalProgramFields.ID];

        formData.append(EducationalProgramFields.TITLE, competence[EducationalProgramFields.TITLE]);
        formData.append(EducationalProgramFields.NUMBER, competence[EducationalProgramFields.NUMBER]);
        formData.append(EducationalProgramFields.QUALIFICATION, competence[EducationalProgramFields.QUALIFICATION]);
        formData.append(EducationalProgramFields.EDUCATIONAL_PROFILE, competence[EducationalProgramFields.EDUCATIONAL_PROFILE]);
        formData.append(EducationalProgramFields.FACULTY, competence[EducationalProgramFields.FACULTY]);
        formData.append(EducationalProgramFields.EDUCATION_FORM, competence[EducationalProgramFields.EDUCATION_FORM]);

        return this.put(`/api/fieldofstudy/${id}`, formData);
    }
}

export default EducationalProgramService;