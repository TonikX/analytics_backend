import AnalyticsService from "../../service/analytics-service";
import {SortingType, Types} from "../../components/SortingButton/types";
import {filterFields} from "./enum";

class WorkProgramListService extends AnalyticsService{
    getWorkPrograms(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType, filters: any){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';
        const numberOp = `work_program_in_change_block__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study__field_of_study__number=${filters[filterFields.NUMBER_OP]}`;
        const nameOp = `work_program_in_change_block__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study__field_of_study__title=${filters[filterFields.NAME_OP]}`;
        const language = `language=${filters[filterFields.LANGUAGE]}`;
        const qualification = `qualification=${filters[filterFields.SPECIALIZATION]}`;
        const onlyMy = filters[filterFields.ONLY_MY] ? `filter=my` : '';
        const archive = filters[filterFields.ARCHIVE] ? `work_status=a` : 'work_status=w';
        const prerequisites = filters[filterFields.PREREQUISITE] ? `prerequisites=${filters[filterFields.PREREQUISITE]}` : ''
        const outcomes = filters[filterFields.OUTCOMES] ? `outcomes=${filters[filterFields.OUTCOMES]}` : ''
        const status = filters[filterFields.STATUS] ? `expertise_with_rpd__expertise_status=${filters[filterFields.STATUS]}` : ''
        const eduProgram = `work_program_in_change_block__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study__title=${filters[filterFields.EDU_PROGRAM]}`

        return this.get(`/api/workprograms?page=${currentPage}&${onlyMy}&${archive}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}&${numberOp}&${nameOp}&${language}&${qualification}&${prerequisites}&${outcomes}&${eduProgram}&${status}`);
    }

    deleteWorkProgram(id: number){
        return this.delete(`/api/workprogram/delete/${id}`);
    }

    createWorkProgram(workProgram: any){
        return this.post(`/api/workprogram/create`, workProgram);
    }
}

export default WorkProgramListService;
