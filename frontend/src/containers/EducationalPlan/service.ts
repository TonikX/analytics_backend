import BaseService from "../../service/base-service";
import {BlocksOfWorkProgramsFields, EducationalPlanBlockFields, EducationalPlanFields, ModuleFields} from "./enum";
import {SortingType, Types} from "../../components/SortingButton/types";

class EducationalPlanService extends BaseService{
    getEducationalPlan(currentPage: number, searchQuery: string, sortingField: string, sortingMode: SortingType){
        const sortingSymbol = sortingMode === Types.ASC ? '-' : sortingMode === Types.DESC ? '+' : '';

        return this.get(`/api/academicplan?page=${currentPage}&search=${searchQuery}&ordering=${sortingSymbol}${sortingField}`);
    }

    getEducationalPlanDetail(id: number){
        return this.get(`/api/academicplan/detail/${id}`);
    }

    deleteEducationalPlan(id: number){
        return this.delete(`/api/academicplan/delete/${id}`);
    }

    createEducationalPlan(competence: any){
        const formData = new FormData();

        formData.append(EducationalPlanFields.PROFILE, competence[EducationalPlanFields.PROFILE]);
        formData.append(EducationalPlanFields.NUMBER, competence[EducationalPlanFields.NUMBER]);
        formData.append(EducationalPlanFields.APPROVAL_DATE, competence[EducationalPlanFields.APPROVAL_DATE]);

        return this.post(`/api/academicplan`, formData);
    }

    createBlockOfWorkPrograms(moduleWithBlocks: any){
        return this.post(`/api/workprogramchangeindisciplineblockmodule/create`, {
            'discipline_block_module': moduleWithBlocks.moduleId,
            [BlocksOfWorkProgramsFields.TYPE]: moduleWithBlocks[BlocksOfWorkProgramsFields.TYPE],
            [BlocksOfWorkProgramsFields.SEMESTER_UNIT]: moduleWithBlocks[BlocksOfWorkProgramsFields.SEMESTER_UNIT].toString(),
            [BlocksOfWorkProgramsFields.WORK_PROGRAMS]: moduleWithBlocks[BlocksOfWorkProgramsFields.WORK_PROGRAMS].map((item: { value: any; }) => item.value),
        });
    }

    changeBlockOfWorkPrograms(moduleWithBlocks: any){
        return this.patch(`/api/workprogramchangeindisciplineblockmodule/update/${moduleWithBlocks[BlocksOfWorkProgramsFields.ID]}`, {
            'discipline_block_module': moduleWithBlocks.moduleId,
            [BlocksOfWorkProgramsFields.TYPE]: moduleWithBlocks[BlocksOfWorkProgramsFields.TYPE],
            [BlocksOfWorkProgramsFields.SEMESTER_UNIT]: moduleWithBlocks[BlocksOfWorkProgramsFields.SEMESTER_UNIT].toString(),
            [BlocksOfWorkProgramsFields.WORK_PROGRAMS]: moduleWithBlocks[BlocksOfWorkProgramsFields.WORK_PROGRAMS].map((item: { value: any; }) => item.value),
        });
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

    changeModule(moduleWithBlocks: any){
        return this.patch(`/api/disciplineblockmodule/update/${moduleWithBlocks[EducationalPlanBlockFields.ID]}`, {
            'descipline_block': moduleWithBlocks.blockId,
            [ModuleFields.NAME]: moduleWithBlocks[ModuleFields.NAME],
        });
    }

    deleteModule(id: number){
        return this.delete(`/api/disciplineblockmodule/delete/${id}`);
    }

    updateEducationalPlan(competence: any){
        const formData = new FormData();
        const id = competence[EducationalPlanFields.ID];

        formData.append(EducationalPlanFields.PROFILE, competence[EducationalPlanFields.PROFILE]);
        formData.append(EducationalPlanFields.NUMBER, competence[EducationalPlanFields.NUMBER]);
        formData.append(EducationalPlanFields.APPROVAL_DATE, competence[EducationalPlanFields.APPROVAL_DATE]);

        return this.put(`/api/academicplan/update/${id}`, formData);
    }
}

export default EducationalPlanService;