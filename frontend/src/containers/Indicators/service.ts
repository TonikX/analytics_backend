import AnalyticsService from "../../service/analytics-service";
import {IndicatorsFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";
import {CompetenceFields} from "../Competences/enum";

class IndicatorsService extends AnalyticsService{
    getIndicators(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/indicator?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    deleteIndicator(id: number){
        return this.delete(`/api/indicator/${id}`);
    }

    getIndicatorsDependsCompetence(competenceId: number){
        return this.get(`/api/competenceindicator/${competenceId}`);
    }

    createIndicator(indicator: any){
        const formData = new FormData();

        formData.append(IndicatorsFields.TITLE, indicator[IndicatorsFields.TITLE]);
        formData.append(IndicatorsFields.NUMBER, indicator[IndicatorsFields.NUMBER]);
        formData.append(IndicatorsFields.COMPETENCE, indicator[IndicatorsFields.COMPETENCE][CompetenceFields.ID]);

        return this.post(`/api/indicator/create`, formData);
    }

    updateIndicator(indicator: any){
        const formData = new FormData();
        const id = indicator[IndicatorsFields.ID];

        formData.append(IndicatorsFields.TITLE, indicator[IndicatorsFields.TITLE]);
        formData.append(IndicatorsFields.NUMBER, indicator[IndicatorsFields.NUMBER]);
        formData.append(IndicatorsFields.COMPETENCE, indicator[IndicatorsFields.COMPETENCE][CompetenceFields.ID]);

        return this.put(`/api/indicator/update/${id}`, formData);
    }
}

export default IndicatorsService;
