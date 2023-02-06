import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {TrainingModuleType} from "../EducationalPlan/TrainingModules/types";
import {SortingType} from "../../components/SortingButton/types";
import {EducationalPlanListType} from "../EducationalPlan/types";
import {EducationalPlanFields} from "../EducationalPlan/enum";
import {Qualifications} from "./enum";

export interface AddModuleToPlanActions {
    getTrainingModulesList: ActionCreatorWithoutPayload;
    setTrainingModulesList: ActionCreatorWithPayload;
    changeModulesCurrentPage: ActionCreatorWithPayload;
    setModulesSortingMode: ActionCreatorWithPayload;
    changeModulesAllCount: ActionCreatorWithPayload;
    setModulesSearchQuery: ActionCreatorWithPayload;

    setPlansSearchQuery: ActionCreatorWithPayload;
    getEducationalPlan: ActionCreatorWithoutPayload;
    setEducationalPlan: ActionCreatorWithPayload;
    changePlansAllCount: ActionCreatorWithPayload;
    changePlansCurrentPage: ActionCreatorWithPayload;

    setSelectedPlans: ActionCreatorWithPayload,
    setSelectedModules: ActionCreatorWithPayload,
    setSelectedBlock: ActionCreatorWithPayload,
    setSelectAll: ActionCreatorWithPayload,

    setQualification: ActionCreatorWithPayload,
    addModuleToPlan: ActionCreatorWithoutPayload
}

export interface EducationalPlanShort {
    [EducationalPlanFields.YEAR]: string;
    [EducationalPlanFields.TITLE]: string;
    [EducationalPlanFields.NUMBER]: number;
    [EducationalPlanFields.ID]: number;
}

export interface addModuleToPlanState {
    trainingModulesList: TrainingModuleType[];
    currentModulesPage: number;
    modulesSearchQuery: string;
    sortingMode: SortingType;
    modulesAllCount: number;

    plansAllCount: number;
    educationalPlansList: EducationalPlanListType[]
    currentPlansPage: number;
    plansSearchQuery: string;

    selectedModules: number[];
    selectedPlans: EducationalPlanShort[];
    selectedBlock: string,
    selectAll: boolean

    qualification: Qualifications;
}
