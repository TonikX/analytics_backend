import AnalyticsService from "../../service/analytics-service";
import {SortingType, Types} from "../../components/SortingButton/types";
import {CompetenceTableType, EducationProgramFields} from "./enum";
import appConfigService from '../../config/app-config-service';
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

  sendToCheck(id: number){
    return this.post(`/api/gh_check/${id}`, {
      new_status: 'on_check'
    });
  }

  sendToWork(id: number){
    return this.post(`/api/gh_check/${id}`, {
      new_status: 'on_work'
    });
  }

  getDownloadFileGeneralCharacteristic(id: number){
    return (`${appConfigService.getApiBasePath()}/api/export/general_characteristic/${id}`);
  }

  getDownloadFileCompetenceMatrix(id: number){
    return (`${appConfigService.getApiBasePath()}/api/export/competence_matrix/${id}`);
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
      "educational_program": program[EducationProgramFields.ACADEMIC_PLAN_FOR_EP],
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

  characteristicDeleteProfessionalStandardLaborFunction({competenceId, type}: any){
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

  saveZUN({indicators, workprogram_id, gh_id, practice_id}: any){
    const payload = {
      gh_id,
      zun: indicators.map((item: any) => ({
        indicator_in_zun: item.value,
        items: []
      }))
    }
    if (practice_id !== -1) {
      return this.post(`/api/zun/practice-many/`,{
        practice_id: practice_id,
        ...payload
      });
    }
    return this.post(`/api/zun/many_create/`,{
      workprogram_id,
      ...payload
    });
  }

  saveZunAllGh({indicators, workprogram_id, practice_id}: any){
    const payload = {
      zun: indicators.map((item: any) => ({
        indicator_in_zun: item.value,
        items: []
      }))
    }
    if (practice_id !== -1) {
      return this.post(`/api/zun/practice-many_create_for_all_gh/`,{
        practice_id: practice_id,
        ...payload,
      });
    }

    return this.post(`/api/zun/many_create_for_all_gh/`,{
      workprogram_id,
      ...payload,
    });
  }

  deleteZUN(compentenceId: number, practice_id: number){
    if (practice_id !== -1) {
      return this.delete(`/api/zun/practice-many/${compentenceId}/`);
    }
    return this.delete(`/api/zun/many_create/${compentenceId}/`);
  }

  addNewRepresentative(id: number, data: any){
    return this.post(`/api/generalcharacteristic/employers/`, {
      general_characteristic: id,
      ...data,
    })
  }

  deleteRepresentative(id: number){
    return this.delete(`/api/generalcharacteristic/employers/${id}`)
  }

  updateRepresentative(id: number, data: any){
    return this.patch(`/api/generalcharacteristic/employers/${id}/`, data)
  }

  getCompetenceDirectionsDependedOnWorkProgram(workProgramId: number, characteristicId: number){
    return this.get(`/api/workprogram/fieldofstudies_for_competences_for_matrix/${workProgramId}/${characteristicId}`);
  }
}

export default Service;
