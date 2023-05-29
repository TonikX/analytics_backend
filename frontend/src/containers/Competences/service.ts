import AnalyticsService from "../../service/analytics-service";
import {CompetenceFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";
import {IndicatorsFields} from "../Indicators/enum";

class CompetenceService extends AnalyticsService{
    getCompetences(currentPage: number, searchQuery: string, codeQuery:string, sortingField: string, sortingMode: SortingType, competenceType: string, filterOnlyWithStandard: boolean, filterAcademicPlan: number | undefined){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';
        const type = competenceType ? `&type=${competenceType}` : ''

        return this.get(`/api/competences?page=${currentPage}&search=${searchQuery}&number=${codeQuery}&ordering=${sortingSymbol}${sortingField}${type}&in_standard=${filterOnlyWithStandard}${filterAcademicPlan ? `&ap_id=${filterAcademicPlan}` : ''}`);
    }

    deleteCompetence(id: number){
        return this.delete(`/api/competence/${id}`);
    }

    createCompetence(competence: any){
        const formData = new FormData();

        formData.append(CompetenceFields.TITLE, competence[CompetenceFields.TITLE]);
        formData.append(CompetenceFields.NUMBER, competence[CompetenceFields.NUMBER]);

        return this.post(`/api/competence/create`, formData);
    }

    updateCompetence(competence: any){
        const formData = new FormData();
        const id = competence[CompetenceFields.ID];

        formData.append(CompetenceFields.TITLE, competence[CompetenceFields.TITLE]);
        formData.append(CompetenceFields.NUMBER, competence[CompetenceFields.NUMBER]);

        return this.put(`/api/competence/${id}`, formData);
    }

    getCompetence(competenceId: number){
        return this.get(`/api/competence/${competenceId}`);
    }

    getIndicators(competenceId: number){
        return this.get(`/api/competenceindicator/${competenceId}`);
    }

    createIndicator(indicator: any){
        const formData = new FormData();

        formData.append(IndicatorsFields.TITLE, indicator[IndicatorsFields.TITLE]);
        formData.append(IndicatorsFields.NUMBER, indicator[IndicatorsFields.NUMBER]);
        formData.append(IndicatorsFields.COMPETENCE, indicator[IndicatorsFields.COMPETENCE]);

        return this.post(`/api/indicator/create`, formData);
    }

    updateIndicator(indicator: any){
        const formData = new FormData();
        const id = indicator[IndicatorsFields.ID];

        formData.append(IndicatorsFields.TITLE, indicator[IndicatorsFields.TITLE]);
        formData.append(IndicatorsFields.NUMBER, indicator[IndicatorsFields.NUMBER]);
        formData.append(IndicatorsFields.COMPETENCE, indicator[IndicatorsFields.COMPETENCE]);

        return this.put(`/api/indicator/update/${id}`, formData);
    }

    deleteIndicator(indicator: any){
        return this.post(`/api/competenceindicator/indicator/delete`, {
            competence_pk: indicator[IndicatorsFields.COMPETENCE],
            indicator_pk: indicator[IndicatorsFields.ID],
        });
    }

    getIndicatorsDependsCompetence(competenceId: number){
        return this.get(`/api/competenceindicator/${competenceId}`);
    }
}

export default CompetenceService;
