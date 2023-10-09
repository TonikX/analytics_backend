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

    getExpertiseLogAccept(id: string){
        return this.get(`/api/expertise/log_accept?wp_id=${id}`);
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
            expertise_status: 'RE',
        });
    }

    getComments(expertiseId: number, step: string){
        return this.get(`/api/expertise/comments/${expertiseId}?block=${step}`);
    }

    updateUnreadCommentStatus(wp: number, block: string){
        return this.post(`/api/experise/comment/statusupdate`, {
            block,
            wp
        });
    }

    createComment(expertiseId: number, step: string, comment: string){
        return this.post(`/api/expertise/comments/create`, {
            user_expertise: expertiseId,
            comment_block: step,
            comment_text: comment,
        });
    }
}

export default ExpertisesService;
