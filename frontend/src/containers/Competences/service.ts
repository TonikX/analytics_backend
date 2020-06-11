import BaseService from "../../service/base-service";
import {CompetenceFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";

class CompetenceService extends BaseService{
    getCompetences(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/competences?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    deleteCompetence(id: number){
        return this.delete(`/api/competence/${id}`);
    }

    createCompetence(competence: any){
        const formData = new FormData();

        formData.append(CompetenceFields.TITLE, competence[CompetenceFields.TITLE]);
        formData.append(CompetenceFields.NUMBER, competence[CompetenceFields.NUMBER]);

        return this.post(`/api/competence/create`, formData);
    }

    updateCourse(competence: any){
        const formData = new FormData();
        const id = competence[CompetenceFields.ID];

        formData.append(CompetenceFields.TITLE, competence[CompetenceFields.TITLE]);
        formData.append(CompetenceFields.NUMBER, competence[CompetenceFields.NUMBER]);

        return this.put(`/api/competence/${id}`, formData);
    }
}

export default CompetenceService;