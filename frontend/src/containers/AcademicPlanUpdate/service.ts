import AnalyticsService from "../../service/analytics-service";
import {SortingType, Types} from "../../components/SortingButton/types";
import {SchedulerConfigurationFields, UpdatedAcademicPlanFields} from "./enum";


class AcademicPlanUpdateService extends AnalyticsService {
    getAcademicPlanUpdateLogs(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType) {
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';
        return this.get(`/api/isu_v2/logs?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    getUpdatedAcademicPlans(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType) {
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';
        return this.get(`api/isu_v2/academic-plans/configuration?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    updateAcademicPlans() {
        return this.post('api/isu_v2/academic-plans/update', {});
    }

    updateAcademicPlansFrom2023() {
        return this.post('api/isu_v2/academic-plans_2023/update ', {});
    }

    getAcademicPlansExcel() {
        return this.get('api/isu_v2/academic-plans/excel');
    }

    createAcademicPlanUpdateConfiguration(academicPlanConfiguration: any) {
        const formData = new FormData();

        formData.append(UpdatedAcademicPlanFields.ACADEMIC_PLAN_ID, academicPlanConfiguration[UpdatedAcademicPlanFields.ACADEMIC_PLAN_ID]);
        formData.append(UpdatedAcademicPlanFields.ACADEMIC_PLAN_TITLE, academicPlanConfiguration[UpdatedAcademicPlanFields.ACADEMIC_PLAN_TITLE]);
        formData.append(UpdatedAcademicPlanFields.UPDATES_ENABLED, academicPlanConfiguration[UpdatedAcademicPlanFields.UPDATES_ENABLED]);
        formData.append(UpdatedAcademicPlanFields.OVER_23, academicPlanConfiguration[UpdatedAcademicPlanFields.OVER_23]);

        return this.post(`api/isu_v2/academic-plans/configuration/create`, formData);

    }

    updateAcademicPlanConfiguration(academicPlanConfiguration: any) {
        const formData = new FormData();
        formData.append(UpdatedAcademicPlanFields.UPDATES_ENABLED, academicPlanConfiguration[UpdatedAcademicPlanFields.UPDATES_ENABLED]);

        return this.patch(`api/isu_v2/academic-plans/configuration/update/${academicPlanConfiguration[UpdatedAcademicPlanFields.ID]}`, formData);
    }

    updateAcademicPlanOver23(academicPlanConfiguration: any) {
        const formData = new FormData();
        formData.append(UpdatedAcademicPlanFields.OVER_23, academicPlanConfiguration[UpdatedAcademicPlanFields.OVER_23]);

        return this.patch(`api/isu_v2/academic-plans/configuration/update/${academicPlanConfiguration[UpdatedAcademicPlanFields.ID]}`, formData);
    }

    getSchedulerConfiguration() {
        return this.get(`api/isu_v2/scheduler`);
    }

    updateSchedulerConfiguration(schedulerConfiguration: any) {
        const formData = new FormData();
        formData.append(SchedulerConfigurationFields.DAYS_INTERVAL, schedulerConfiguration[SchedulerConfigurationFields.DAYS_INTERVAL]);
        formData.append(SchedulerConfigurationFields.EXECUTION_HOURS, schedulerConfiguration[SchedulerConfigurationFields.EXECUTION_HOURS]);

        return this.put(`api/isu_v2/scheduler/configuration/update`, formData);
    }
}

export default AcademicPlanUpdateService;
