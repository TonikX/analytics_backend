import BaseService from "../../service/base-service";
import {ProfessionsFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";

class ProfessionsService extends BaseService{
    getProfessions(currentPage: number, searchQuery: Object, sortingField: string, sortingMode: SortingType, role: string|null){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        // @ts-ignore
        return this.get(`/api/professions?page=${currentPage}&ordering=${sortingSymbol}${sortingField}&role=${role || ''}`);
    }

    deleteProfession(itemId: number){
        return this.delete(`/api/profession/delete/${itemId}`);
    }

    createProfession(item: any){
        const formData = new FormData();

        formData.append(ProfessionsFields.ROLE, item[ProfessionsFields.ROLE]);
        formData.append(ProfessionsFields.TITLE, item[ProfessionsFields.TITLE]);

        return this.post(`/api/profession/create`, formData);
    }

    updateProfession(item: any){
        const id = item[ProfessionsFields.ID];

        return this.patch(`/api/profession/update/${id}`, item);
    }

    getProfession(id: any){
        return this.get(`/api/profession/detail/${id}`);
    }

    getSkills(id: number, currentPage: number, searchQuery: Object, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        // @ts-ignore
        return this.get(`/api/skillsofprofessioninprofession/${id}?page=${currentPage}&ordering=${sortingSymbol}${sortingField}`);
    }

    deleteSkill(itemId: number){
        return this.delete(`/api/skillsofprofessioninprofession/delete/${itemId}`);
    }

    createSkill(item: any){
        const formData = new FormData();

        formData.append(ProfessionsFields.LEVEL, item[ProfessionsFields.LEVEL]);
        formData.append(ProfessionsFields.ITEM, item[ProfessionsFields.ITEM][ProfessionsFields.ID]);
        formData.append(ProfessionsFields.PROFESSION, item[ProfessionsFields.PROFESSION]);

        return this.post(`/api/skillsofprofessioninprofession/create`, formData);
    }

    updateSkill(item: any){
        const id = item[ProfessionsFields.ID];

        return this.patch(`/api/skillsofprofessioninprofession/update/${id}`, {
            [ProfessionsFields.LEVEL]: item[ProfessionsFields.LEVEL],
            [ProfessionsFields.ITEM]: item[ProfessionsFields.ITEM][ProfessionsFields.ID],
        });
    }
}

export default ProfessionsService;