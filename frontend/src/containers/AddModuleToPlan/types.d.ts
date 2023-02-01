import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {TrainingModuleType} from "../EducationalPlan/TrainingModules/types";
import {SortingType} from "../../components/SortingButton/types";
import {EducationalPlanListType} from "../EducationalPlan/types";

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

    addModuleToPlan: ActionCreatorWithoutPayload
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
    selectedPlans: number[];
    selectedBlock: string,
    selectAll: boolean
}
