import AnalyticsService from "../../service/analytics-service";
import {
    BlocksOfWorkProgramsFields,
    DownloadFileModalFields,
    EducationalPlanBlockFields,
    EducationalPlanFields,
    ModuleFields, PlanStatuses
} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";

import appConfigService from '../../config/app-config-service';
import {REQUIRED} from "./data";

class EducationalPlanService extends AnalyticsService{
    getEducationalPlan(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/academicplan/short?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    getEducationalPlanDetail(id: number, trajectoryRoute: boolean){
        if (trajectoryRoute){
            return this.get(`api/individualization/individual_path/${id}/`)
        }
        return this.get(`/api/academicplan/detail/${id}`);
    }

    getDirectionsDependedOnWorkProgram(workProgramId: number){
        return this.get(`/api/workprogram/fieldofstudies/${workProgramId}`);
    }

    getCompetenceDirectionsDependedOnWorkProgram(workProgramId: number, characteristicId: number){
        return this.get(`/api/workprogram/fieldofstudies_for_competences/${workProgramId}`);
    }

    deleteEducationalPlan(id: number){
        return this.delete(`/api/academicplan/delete/${id}`);
    }

    saveCompetenceBlock(postData: any){
        return this.post(`/api/zun/`, postData);
    }

    deleteCompetenceBlock({wpChangeBlockId, competenceId}: any){
        return this.delete(`/api/zun/delete/competence/${wpChangeBlockId}/wp_in_fs/${competenceId}`);
    }

    deleteWPFromZun(id: number){
        return this.delete(`api/workprograminfieldofstudy/${id}`);
    }

    planTrajectorySelectOptionalWp({workProgram, moduleId, planId}: any){
        return this.post(`/api/individualization/individual_path/change_workprogram/`, {
            work_program_change_in_discipline_block_module: moduleId,
            work_program: workProgram,
            individual_implementation_of_academic_plan: planId
        });
    }

    planTrajectorySelectElectives({workPrograms, moduleId, planId}: any){
        const payload = workPrograms.map((wpId: number) => ({
            work_program_change_in_discipline_block_module: wpId,
            discipline_block_module: moduleId,
            individual_implementation_of_academic_plan: planId
        }));

        return this.post(`/api/individualization/individual_path/electives/create`, {
            electives: payload
        });
    }

    planTrajectorySelectSpecialization({blockId, id, planId}: any){
        return this.post(`/api/individualization/individual_path/change_specialization/`, {
            discipline_block: blockId,
            discipline_block_module: id,
            individual_implementation_of_academic_plan: planId
        });
    }

    createEducationalPlan(plan: any){
        const formData = new FormData();

        formData.append(EducationalPlanFields.DIRECTION, plan[EducationalPlanFields.DIRECTION].value);
        formData.append(EducationalPlanFields.PROFILE, plan[EducationalPlanFields.PROFILE]);
        formData.append(EducationalPlanFields.APPROVAL_DATE, plan[EducationalPlanFields.APPROVAL_DATE]);
        formData.append(EducationalPlanFields.YEAR, plan[EducationalPlanFields.YEAR]);
        formData.append(EducationalPlanFields.QUALIFICATION, plan[EducationalPlanFields.QUALIFICATION]);
        formData.append(EducationalPlanFields.EDUCATION_FORM, plan[EducationalPlanFields.EDUCATION_FORM]);

        return this.post(`/api/academicplan/create`, formData);
    }

    createBlockOfWorkPrograms(moduleId: number){
        return this.post(`/api/workprogramchangeindisciplineblockmodule/create`, {
            //@ts-ignore
            'discipline_block_module': parseInt(moduleId),
            change_type: REQUIRED,
            semester_start: [1]
        });
    }

    changeBlockOfWorkPrograms(moduleWithBlocks: any){
        return this.patch(`/api/workprogramchangeindisciplineblockmodule/update/${moduleWithBlocks[BlocksOfWorkProgramsFields.ID]}`, moduleWithBlocks);
    }

    deleteBlockOfWorkPrograms(id: number){
        return this.delete(`/api/workprogramchangeindisciplineblockmodule/delete/${id}`);
    }

    createModule(moduleWithBlocks: any){
        return this.post(`/api/disciplineblockmodule/create`, {
            'descipline_block': moduleWithBlocks.blockId,
            [ModuleFields.NAME]: moduleWithBlocks[ModuleFields.NAME],
        });
    }

    addModule(module: any, block: any){
        return this.post(`/api/disciplineblockmodule/insert`, {
            'old_module_id': module,
            'block_id': block,
        });
    }

    changeModule(moduleWithBlocks: any){
        return this.patch(`/api/disciplineblockmodule/update/${moduleWithBlocks[EducationalPlanBlockFields.ID]}`, {
            'descipline_block': moduleWithBlocks.blockId,
            [ModuleFields.NAME]: moduleWithBlocks[ModuleFields.NAME],
        });
    }

    deleteModule(id: number){
        return this.delete(`/api/disciplineblockmodule/delete/${id}`);
    }

    changeModulePosition(blockId:number, oldIndex:number, newIndex:number){
        return this.post('/api/new_ordinal_numbers_for_modules_in_ap', {
            block: blockId,
            new_ordinal_number: newIndex,
            old_ordinal_number: oldIndex,
        });
    }

    educationalPlanConnectModules(modules: any, blockId: any){
        return this.post(`/api/disciplineblockmodule/insert_to_block`, {
            descipline_block: blockId,
            module: modules,
        });
    }

    educationalPlanDisconnectModule(module: any, blockId: any){
        return this.delete(`/api/disciplineblockmodule/insert_to_block?module=${module}&descipline_block=${blockId}`);
    }

    getDownloadFileLink(dialogData: any){
        return (`${appConfigService.getApiBasePath()}/api/export/docx/${dialogData[DownloadFileModalFields.ID]}/${dialogData[DownloadFileModalFields.DIRECTION_ID]}/${dialogData[DownloadFileModalFields.ACADEMIC_PLAN_ID]}/${dialogData[DownloadFileModalFields.YEAR]}`);
    }

    updateEducationalPlan(competence: any){
        const formData = new FormData();
        const id = competence[EducationalPlanFields.ID];

        formData.append(EducationalPlanFields.PROFILE, competence[EducationalPlanFields.PROFILE]);
        formData.append(EducationalPlanFields.NUMBER, competence[EducationalPlanFields.NUMBER]);
        formData.append(EducationalPlanFields.APPROVAL_DATE, competence[EducationalPlanFields.APPROVAL_DATE]);
        formData.append(EducationalPlanFields.YEAR, competence[EducationalPlanFields.YEAR]);
        formData.append(EducationalPlanFields.QUALIFICATION, competence[EducationalPlanFields.QUALIFICATION]);
        formData.append(EducationalPlanFields.EDUCATION_FORM, competence[EducationalPlanFields.EDUCATION_FORM]);

        return this.put(`/api/academicplan/update/${id}`, formData);
    }

    updatePatchEducationalPlan(plan: any){
        const id = plan[EducationalPlanFields.ID];

        return this.patch(`/api/implementationacademicplan/update/${id}`, plan);
    }

    getPlanDownloadLink(planId: any){
        return (`${appConfigService.getApiBasePath()}/api/export/academic_plan/${planId}`);
    }

    sendPlanToValidate(planId: any){
        return this.post(`/api/academicplan_check/${planId}`, {});
    }

    sendPlanToRework(planId: any){
        return this.post(`/api/academicplan_check/${planId}`, {
            new_status: PlanStatuses.IN_WORK
        });
    }

    approvePlan(planId: any){
        return this.post(`/api/academicplan_check/${planId}`, {
            new_status: PlanStatuses.APPROVED
        });
    }
}

export default EducationalPlanService;
