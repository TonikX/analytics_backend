import AnalyticsService from "../../service/analytics-service";
import {SortingType, Types} from "../../components/SortingButton/types";
import {WorkProgramStatusType} from "../WorkProgram/types";

class ExpertisesService extends AnalyticsService{
    getExpertises(currentPage: number, search: string, sortingField: string, sortingMode: SortingType, selectedStatus: WorkProgramStatusType|'', selectedQualification: string){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        // @ts-ignore
        return this.get(`/api/expertise?page=${currentPage}&ordering=${sortingSymbol}${sortingField}&search=${search}&expertise_status=${selectedStatus}&work_program__qualification=${selectedQualification}`);
    }

    getExpertise(id: number){
        return this.get(`/api/expertise/${id}`);
    }

    addExpertToExpertise(expertiseId: number, userId: number){
        return this.post(`/api/expertise/user/create`, {
            expert: userId,
            expertise: expertiseId
        });
    }

    removeExpertFromExpertise(expertiseId: number, userId: number){
        return this.delete(`/api/expertise/user/delete/${userId}`, {
            expertise: expertiseId
        });
    }

    approveExpertise(expertiseId: number){
        return this.patch(`/api/expertise/update/${expertiseId}`, {
            expertise_status: 'AC',
        });
    }

    sendForRework(expertiseId: number){
        return this.patch(`/api/expertise/update/${expertiseId}`, {
            expertise_status: 'WK',
        });
    }
}

export default ExpertisesService;