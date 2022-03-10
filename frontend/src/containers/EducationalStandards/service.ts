import AnalyticsService from "../../service/analytics-service";
import {EducationalStandardFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";

class EducationalStandardsService extends AnalyticsService {
    getEducationalStandards(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType) {
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/educational_standarts?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    getEducationalStandard(id: number) {
        return this.get(`/api/educational_standarts/${id}/`)
    }

    deleteEducationalStandard(id: number) {
        return this.delete(`/api/educational_standarts/delete/${id}`);
    }

    createEducationalStandard(EducationalStandard: any) {
        const formData = new FormData();

        formData.append(EducationalStandardFields.TITLE, EducationalStandard[EducationalStandardFields.TITLE]);
        formData.append(EducationalStandardFields.YEAR, EducationalStandard[EducationalStandardFields.YEAR]);

        return this.post(`api/educational_standarts/create`, formData);
    }

    changeEducationalStandard(EducationalStandard: any) {
        const formData = new FormData();
        const id = EducationalStandard[EducationalStandardFields.ID];

        formData.append(EducationalStandardFields.TITLE, EducationalStandard[EducationalStandardFields.TITLE]);
        formData.append(EducationalStandardFields.YEAR, EducationalStandard[EducationalStandardFields.YEAR]);

        return this.put(`/api/educational_standarts/update/${id}`, formData);
    }
}

export default EducationalStandardsService;