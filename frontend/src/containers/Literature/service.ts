import BaseService from "../../service/base-service";
import {LiteratureFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";

class LiteratureServices extends BaseService{
    getLiterature(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/onlinecourse?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    deleteLiterature(courseId: number){
        return this.delete(`/api/onlinecourse/delete/${courseId}`);
    }

    createLiterature(course: any){
        const formData = new FormData();

        formData.append(LiteratureFields.DESCRIPTION, course[LiteratureFields.DESCRIPTION]);
        return this.post(`/api/onlinecourse/create`, formData);
    }

    updateLiterature(course: any){
        const formData = new FormData();
        const courseId = course[LiteratureFields.ID];

        formData.append(LiteratureFields.DESCRIPTION, course[LiteratureFields.DESCRIPTION]);

        return this.patch(`/api/onlinecourse/update/${courseId}`, formData);
    }
}

export default LiteratureServices;