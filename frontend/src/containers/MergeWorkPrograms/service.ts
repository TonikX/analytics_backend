import AnalyticsService from "../../service/analytics-service";

class MergeWorkProgramsService extends AnalyticsService {
    getWorkPrograms(searchQuery: string) {
        return this.get(`/api/workprograms?filter=my&search=${searchQuery}`);
    }

    mergeContent(sourceId: number, targetId: number) {
        return this.post(`/api/workprogram/merge_content`, {
            from_copy_id: sourceId,
            to_copy_id: targetId,
        });
    }
}

export default MergeWorkProgramsService;