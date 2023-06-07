import AnalyticsService from "../../service/analytics-service";
import {EducationalStandardFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";
import {
    EducationalStandardAddCompetenceActionType,
    EducationalStandardAddIndicatorActionType,
    EducationalStandardCreateGroupActionType,
    EducationalStandardDeleteCompetenceActionType,
    EducationalStandardDeleteGroupActionType,
    EducationalStandardDeleteIndicatorActionType,
    EducationalStandardSaveGroupTitleActionType
} from "./types";

import {CompetenceTableType} from "../EducationalProgram/enum";

class EducationalStandardsService extends AnalyticsService {
    getEducationalStandards(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType) {
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/educational_standarts?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    getEducationalStandard(id: number) {
        return this.get(`/api/educational_standarts/detail/${id}`)
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

        return this.patch(`/api/educational_standarts/update/${id}`, formData);
    }

    educationalStandardSaveCompetence({groupId, type, competenceId}: EducationalStandardAddCompetenceActionType){
        return this.post(`/api/general_ch/${this.getCompetenceTableUrl(type)}/competence/`, {
            "group_of_pk": groupId,
            "competence": competenceId
        });
    }

    educationalStandardSaveIndicator({indicatorId, type, competenceId}: EducationalStandardAddIndicatorActionType){
        return this.post(`/api/general_ch/${this.getCompetenceTableUrl(type)}/competence/indicator/`, {
            "competence_in_group_of_pk": competenceId,
            "indicator": indicatorId
        });
    }

    getCompetenceTableUrl(type: CompetenceTableType){
        switch (type){
            case CompetenceTableType.SUPRA_PROFESSIONAL_COMPETENCES:
                return 'group_of_over_prof_competence';
            case CompetenceTableType.GENERAL_PROFESSIONAL_COMPETENCES:
                return 'group_of_general_prof_competence';
            case CompetenceTableType.KEY_COMPETENCES:
                return 'group_of_key_competence';
            case CompetenceTableType.PROFESSIONAL_COMPETENCES:
                return 'group_of_pk_competence';
        }
    }

    educationalStandardCreateGroup({name, type}: EducationalStandardCreateGroupActionType, educationalStandardId: number){
        return this.post(`/api/general_ch/${this.getCompetenceTableUrl(type)}/`, {
            name,
            educational_standard: educationalStandardId
        });
    }

    educationalStandardDeleteGroup({groupId, type}: EducationalStandardDeleteGroupActionType){
        return this.delete(`/api/general_ch/${this.getCompetenceTableUrl(type)}/${groupId}`);
    }

    educationalStandardDeleteCompetence({competenceId, type}: EducationalStandardDeleteCompetenceActionType){
        return this.delete(`/api/general_ch/${this.getCompetenceTableUrl(type)}/competence/${competenceId}`);
    }

    educationalStandardDeleteIndicator({indicatorId, type}: EducationalStandardDeleteIndicatorActionType){
        return this.delete(`/api/general_ch/${this.getCompetenceTableUrl(type)}/competence/indicator/${indicatorId}`);
    }

    educationalStandardSaveGroupTitle({groupId, type, title}: EducationalStandardSaveGroupTitleActionType){
        return this.patch(`/api/general_ch/${this.getCompetenceTableUrl(type)}/${groupId}/`, {
            name: title
        });
    }

    educationalStandardAddTask(id: number, task: string) {
        return this.post(`/api/task_prof_standarts/create`, {
            name: task,
            educational_standard: id,
        });
    }

    educationalStandardDeleteTask(taskId: string) {
        return this.delete(`/api/task_prof_standarts/delete/${taskId}`);
    }

    educationalStandardUpdateTask({ id, name }: any) {
        return this.patch(`/api/task_prof_standarts/update/${id}`, {
            name,
        });
    }
}

export default EducationalStandardsService;