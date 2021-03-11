import AnalyticsService from "../../service/analytics-service";
import {SortingType, Types} from "../../components/SortingButton/types";
import {CompetenceTableType, EducationProgramFields} from "./enum";
import {CharacteristicCreateGroupActionType, CharacteristicDeleteGroupActionType} from "./types";

class Service extends AnalyticsService{
    getEducationalProgramList(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/EducationalProgram?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    deleteEducationProgram(id: number){
        return this.delete(`/api/EducationalProgram/delete/${id}`);
    }

    deleteEducationalProgramCharacteristic(id: number){
        return this.delete(`/api/implementationacademicplan/delete/${id}`);
    }

    getEducationalProgramCharacteristic(id: number){
        return this.get(`/api/GeneralCharacteristics/detail_with_educational_program/${id}`);
    }

    createEducationProgram(program: any){
        return this.post(`/api/EducationalProgram/create`, {
            "academic_plan_for_ep": program[EducationProgramFields.ACADEMIC_PLAN_FOR_EP][EducationProgramFields.ID],
            "qualification": program[EducationProgramFields.QUALIFICATION],
            "manager": program[EducationProgramFields.MANAGER],
            "year_of_recruitment": program[EducationProgramFields.YEAR],
        });
    }

    updateEducationProgram(id: any, payload: any){
        return this.patch(`/api/EducationalProgram/update/${id}`, payload);
    }

    updateEducationProgramCharacteristic(id: any, payload: any){
        return this.patch(`/api/GeneralCharacteristics/update/${id}`, payload);
    }

    getCompetenceTableUrl(type: CompetenceTableType){
        switch (type){
            case CompetenceTableType.SUPRA_PROFESSIONAL_COMPETENCES:
                return 'group_of_over_prof_competence';
            case CompetenceTableType.GENERAL_PROFESSIONAL_COMPETENCES:
                return 'group_of_general_prof_competence';
            case CompetenceTableType.KEY_COMPETENCES:
                return 'group_of_key_competence';
        }
    }

    characteristicCreateGroup({name, type}: CharacteristicCreateGroupActionType, characteristicId: number){
        return this.post(`/api/general_ch/${this.getCompetenceTableUrl(type)}/`, {
            name,
            general_characteristic: characteristicId
        });
    }

    characteristicDeleteGroup({groupId, type}: CharacteristicDeleteGroupActionType){
        return this.delete(`/api/general_ch/${this.getCompetenceTableUrl(type)}/${groupId}`);
    }
}

export default Service;