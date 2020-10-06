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
}

export default ProfessionsService;