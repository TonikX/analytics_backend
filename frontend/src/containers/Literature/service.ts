import BaseService from "../../service/base-service";
import {literatureFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";

class LiteratureServices extends BaseService{
    getLiterature(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/BibliographicReference?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    deleteLiterature(courseId: number){
        return this.delete(`/api/BibliographicReference/delete/${courseId}`);
    }

    createLiterature(course: any){
        const formData = new FormData();

        formData.append(literatureFields.DESCRIPTION, course[literatureFields.DESCRIPTION]);
        return this.post(`/api/BibliographicReference/create`, formData);
    }

    updateLiterature(course: any){
        const formData = new FormData();
        const courseId = course[literatureFields.ID];

        formData.append(literatureFields.DESCRIPTION, course[literatureFields.DESCRIPTION]);

        return this.patch(`/api/BibliographicReference/update/${courseId}`, formData);
    }
}

export default LiteratureServices;