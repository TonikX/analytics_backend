import AnalyticsService from "../../service/analytics-service";
import {SubjectAreaFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";

class SubjectAreaServices extends AnalyticsService{
    getSubjectArea(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/domain?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    deleteSubjectArea(subjectAreaId: number){
        return this.delete(`/api/domain/${subjectAreaId}`);
    }

    createSubjectArea(subjectArea: any){
        const formData = new FormData();

        formData.append(SubjectAreaFields.TITLE, subjectArea[SubjectAreaFields.TITLE]);
        return this.post(`/api/domain/`, formData);
    }

    updateSubjectArea(subjectArea: any){
        const formData = new FormData();
        const courseId = subjectArea[SubjectAreaFields.ID];

        formData.append(SubjectAreaFields.TITLE, subjectArea[SubjectAreaFields.TITLE]);

        return this.patch(`/api/domain/${courseId}`, formData);
    }
}

export default SubjectAreaServices;