import AnalyticsService from "../../service/analytics-service";
import {ProfessionalStandardFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";

class ProfessionalStandardsService extends AnalyticsService {
    getProfessionalStandards(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType) {
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/professionalstandard?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    getProfessionalStandard(id: number) {
        return this.get(`/api/professionalstandard/${id}/`)
    }

    deleteProfessionalStandards(id: number) {
        return this.delete(`/api/professionalstandard/${id}`);
    }

    createProfessionalStandards(ProfessionalStandard: any) {
        const formData = new FormData();

        formData.append(ProfessionalStandardFields.TITLE, ProfessionalStandard[ProfessionalStandardFields.TITLE]);
        formData.append(ProfessionalStandardFields.NUMBER, ProfessionalStandard[ProfessionalStandardFields.NUMBER]);
        formData.append(ProfessionalStandardFields.CODE, ProfessionalStandard[ProfessionalStandardFields.CODE]);
        formData.append(ProfessionalStandardFields.NAME, ProfessionalStandard[ProfessionalStandardFields.NAME]);

        return this.post(`api/professionalstandard/`, formData);
    }

    changeProfessionalStandards(ProfessionalStandard: any) {
        const formData = new FormData();
        const id = ProfessionalStandard[ProfessionalStandardFields.ID];

        formData.append(ProfessionalStandardFields.TITLE, ProfessionalStandard[ProfessionalStandardFields.TITLE]);
        formData.append(ProfessionalStandardFields.NUMBER, ProfessionalStandard[ProfessionalStandardFields.NUMBER]);
        formData.append(ProfessionalStandardFields.CODE, ProfessionalStandard[ProfessionalStandardFields.CODE]);
        formData.append(ProfessionalStandardFields.NAME, ProfessionalStandard[ProfessionalStandardFields.NAME]);

        return this.put(`/api/professionalstandard/${id}/`, formData);
    }

    createProfessionalStandardAdditionalFields(id:number, name: string, code: string, qualificationLevel: string) {
        return this.post(`/api/generalizedlaborfunction/`, {
            professional_standard: id,
            name,
            code,
            qualification_level:qualificationLevel
        });
    }

    updateProfessionalStandardAdditionalFields(id:number, name: string, code: string, qualificationLevel: string) {
        return this.put(`/api/generalizedlaborfunction/${id}/`, {
            name,
            code,
            qualification_level:qualificationLevel
        });
    }

    deleteProfessionalStandardAdditionalFields(id:number){
        return this.delete(`/api/generalizedlaborfunction/${id}/`)
    }

    getLaborFunction(search: string){
        return this.get(`/api/generalizedlaborfunction?search=${search}`, )
    }

}
export default ProfessionalStandardsService;