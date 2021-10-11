import AnalyticsService from "../../service/analytics-service";

class RecordsService extends AnalyticsService{
    getStatisticsWorkProgram(qualification: string){
        return this.get(`api/record/workprograms/quantity/${qualification}`);
    }

    getStatisticsOP(qualification: string, year: string){
        return this.get(`api/record/academicplans/quantity/${qualification}/${year}`);
    }

    getAPWP(pk:number){
        return this.get(`api/record/academic_plan/academic_wp_description/${pk}`);
    }

    getSimpleStatistics(){
        return this.get(`api/record/simple`);
    }

    getSU(){
        return this.get(`api/record/structural_units`);
    }

    getAP(){
        return this.get(`api/academicplan/short`);
    }

    getWPwithoutStructuralUnit(){
        return this.get('api/record/structural/empty')
    }

    getStructuralUnitWP(status: string){
        return this.get(`/api/record/structural/workprogram${status}`);
    }

    getStructuralUnitWPFilter(structural_unit_id: string,year:string,semester:string,status:string){
        return this.get(`/api/record/structural/workprogram_extend${structural_unit_id}${semester}${year}${status}`);
    }
}

export default RecordsService