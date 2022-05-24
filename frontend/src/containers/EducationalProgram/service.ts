import AnalyticsService from "../../service/analytics-service";
import {SortingType, Types} from "../../components/SortingButton/types";
import {CompetenceTableType, EducationProgramFields} from "./enum";
import {
    CharacteristicAddCompetenceActionType,
    CharacteristicAddIndicatorActionType, CharacteristicAddProfessionalStandardActionType,
    CharacteristicCreateGroupActionType,
    CharacteristicDeleteCompetenceActionType,
    CharacteristicDeleteGroupActionType,
    CharacteristicDeleteIndicatorActionType, CharacteristicDeleteProfessionalStandardActionType,
    CharacteristicSaveCompetenceLaborFunctionActionType,
    CharacteristicSaveGroupTitleActionType
} from "./types";

class Service extends AnalyticsService{
    getEducationalProgramList(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/general_characteristic?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    deleteEducationProgram(id: number){
        return this.delete(`/api/EducationalProgram/delete/${id}`);
    }

    deleteEducationalProgramCharacteristic(id: number){
        return this.delete(`/api/implementationacademicplan/delete/${id}`);
    }

    getEducationalProgramCharacteristic(id: number){
        return this.get(`/api/general_characteristic/detail/${id}`);
    }

    createEducationProgram(program: any){
        return this.post(`/api/general_characteristic/create`, {
            "educational_program": [program[EducationProgramFields.ACADEMIC_PLAN_FOR_EP][EducationProgramFields.ID]],
            // "qualification": program[EducationProgramFields.QUALIFICATION],
            "manager": program[EducationProgramFields.MANAGER],
            // "year_of_recruitment": program[EducationProgramFields.YEAR],
        });
    }

    updateEducationProgram(id: any, payload: any){
        return this.patch(`/api/general_characteristic/update/${id}`, payload);
    }

    updateEducationProgramCharacteristic(id: any, payload: any){
        return this.patch(`/api/general_characteristic/update/${id}`, payload);
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

    characteristicCreateGroup({name, type, subType}: CharacteristicCreateGroupActionType, characteristicId: number ){
        return this.post(`/api/general_ch/${this.getCompetenceTableUrl(type)}/`, {
            name,
            general_characteristic: characteristicId,
            type_of_pk_competence: subType,
        });
    }

    characteristicDeleteGroup({groupId, type}: CharacteristicDeleteGroupActionType){
        return this.delete(`/api/general_ch/${this.getCompetenceTableUrl(type)}/${groupId}`);
    }

    characteristicDeleteCompetence({competenceId, type}: CharacteristicDeleteCompetenceActionType){
        return this.delete(`/api/general_ch/${this.getCompetenceTableUrl(type)}/competence/${competenceId}`);
    }

    characteristicDeleteIndicator({indicatorId, type}: CharacteristicDeleteIndicatorActionType){
        return this.delete(`/api/general_ch/${this.getCompetenceTableUrl(type)}/competence/indicator/${indicatorId}/`);
    }

    characteristicSaveGroupTitle({groupId, type, title}: CharacteristicSaveGroupTitleActionType){
        return this.patch(`/api/general_ch/${this.getCompetenceTableUrl(type)}/${groupId}/`, {
            name: title
        });
    }

    characteristicSaveCompetenceLaborFunction({competenceId, type, laborFunction}: CharacteristicSaveCompetenceLaborFunctionActionType){
        return this.patch(`/api/general_ch/${this.getCompetenceTableUrl(type)}/competence/${competenceId}/`, {
            labor_functions: laborFunction
        });
    }
    characteristicSaveCompetenceKindOfActivity({competenceId, type, kindOfActivity}: any){
        return this.patch(`/api/general_ch/${this.getCompetenceTableUrl(type)}/competence/${competenceId}/`, {
            kinds_of_activity_for_miner: kindOfActivity
        });
    }

    characteristicSaveProfessionalStandard({competenceId, type, professionalStandardId}: CharacteristicAddProfessionalStandardActionType){
        return this.patch(`/api/general_ch/${this.getCompetenceTableUrl(type)}/competence/${competenceId}/`, {
            professional_standard: professionalStandardId
        });
    }

    characteristicSaveProfessionalStandardLaborFunction({competenceId, type, laborFunction}: any){
        return this.patch(`/api/general_ch/${this.getCompetenceTableUrl(type)}/competence/${competenceId}/`, {
            generalized_labor_functions: laborFunction
        });
    }

    characteristicDeleteProfessionalStandardLaborFunction({competenceId, type, laborFunction}: any){
        return this.patch(`/api/general_ch/${this.getCompetenceTableUrl(type)}/competence/${competenceId}/`, {
            generalized_labor_functions: null
        });
    }

    characteristicSaveKindOfActivity({competenceId, type, kindOfActivity}: any){
        return this.patch(`/api/general_ch/${this.getCompetenceTableUrl(type)}/competence/${competenceId}/`, {
            kinds_of_activity: kindOfActivity
        });
    }

    characteristicDeleteProfessionalStandard({competenceId, type}: CharacteristicDeleteProfessionalStandardActionType){
        return this.patch(`/api/general_ch/${this.getCompetenceTableUrl(type)}/competence/${competenceId}/`, {
            professional_standard: null
        });
    }

    characteristicDeleteKindOfActivity({competenceId, type}: CharacteristicDeleteProfessionalStandardActionType){
        return this.patch(`/api/general_ch/${this.getCompetenceTableUrl(type)}/competence/${competenceId}/`, {
            kinds_of_activity: null
        });
    }

    characteristicSaveCompetence({groupId, type, competenceId}: CharacteristicAddCompetenceActionType){
        return this.post(`/api/general_ch/${this.getCompetenceTableUrl(type)}/competence/`, {
            "group_of_pk": groupId,
            "competence": competenceId
        });
    }

    characteristicSaveIndicator({indicatorId, type, competenceId}: CharacteristicAddIndicatorActionType){
        return this.post(`/api/general_ch/${this.getCompetenceTableUrl(type)}/competence/indicator/`, {
            "competence_in_group_of_pk": competenceId,
            "indicator": indicatorId
        });
    }

    getKindsOfActivity(name: string){
        return this.get(`/api/generalcharacteristic/kindsofactivity?search=${name}`);
    }

    getObjectsOfActivity(name: string){
        return this.get(`/api/generalcharacteristic/objectsofactivity?search=${name}`);
    }

    getTaskTypes(name: string){
        return this.get(`/api/generalcharacteristic/tasktypes?search=${name}`);
    }

    createKindOfActivity(name: string){
        return this.post(`/api/generalcharacteristic/kindsofactivity/`, {
            name,
        });
    }

    createObjectOfActivity(name: string){
        return this.post(`/api/generalcharacteristic/objectsofactivity/`, {
            name,
        });
    }

    createTaskType(name: string){
        return this.post(`/api/generalcharacteristic/tasktypes/`, {
            name,
        });
    }

    getCompetenceMatrix(id: number) {
        return this.get(`/api/general_characteristic/competence_matrix/${id}`);
    }

    saveZUN({indicator, plans, results}: any){
        return this.post(`/api/zun/many_create/`,{
            wpa_in_fss: plans,
            zun: {
                indicator_in_zun: indicator,
                items: results
            }
        });
    }
}

export default Service;
