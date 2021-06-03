import AnalyticsService from "../../service/analytics-service";

import {SortingType, Types} from "../../components/SortingButton/types";

class RecordsService extends AnalyticsService{
    getStatisticsWorkProgram(qualification: string){


        return this.get(`api/record/workprograms/quantity/${qualification}`);
    }
    getStatisticsOP(qualification: string, year: string){


        return this.get(`api/record/academicplans/quantity/${qualification}/${year}`);
    }
    getAPWP(pk:number){


        return this.get(`api/statistic/academic_plan/academic_wp_description/${pk}`);
    }

    getSimpleStatistics(){


        return this.get(`api/statistic/simple`);
    }
    getSU(){


        return this.get(`api/statistic/structural_units`);
    }
    getAP(){

        return this.get(`api/statistic/academic_plans`);
    }

    getWPwithoutStructuralUnit(){
        return this.get('api/statistic/structural/empty')
    }

    getStructuralUnitWP(status: string){

        return this.get(`/api/statistic/structural/workprogram${status}`);
    }
    getStructuralUnitWPFilter(structural_unit_id: string,year:string,semester:string,status:string){
        console.log('/api/statistic/structural/workprogram_extend', structural_unit_id,year,semester,status)
        return this.get(`/api/statistic/structural/workprogram_extend${structural_unit_id}${semester}${year}${status}`);
    }




}
export default RecordsService