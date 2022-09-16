import AnalyticsService from "../../service/analytics-service";
import {literatureFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";

class LiteratureServices extends AnalyticsService{
    getLiterature(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/BibliographicReference?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    getEbscoLiterature(searchQuery: string){
        return this.get(`/api/workprogram_sources/search_in_ebsco?query=${searchQuery.length ? searchQuery : 'А'}`);
    }

    deleteLiterature(literatureId: number){
        return this.delete(`/api/BibliographicReference/delete/${literatureId}`);
    }

    createLiterature(literature: any){
        const formData = new FormData();

        formData.append(literatureFields.DESCRIPTION, literature[literatureFields.DESCRIPTION]);
        return this.post(`/api/BibliographicReference/create`, formData);
    }

    updateLiterature(literature: any){
        const formData = new FormData();
        const literatureId = literature[literatureFields.ID];

        formData.append(literatureFields.DESCRIPTION, literature[literatureFields.DESCRIPTION]);

        return this.patch(`/api/BibliographicReference/update/${literatureId}`, formData);
    }
}

export default LiteratureServices;