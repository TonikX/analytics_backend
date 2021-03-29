import {WithStyles} from "@material-ui/core";
import {fields, FoldersFields} from './enum';
import styles from "./Folders.styles";
import {WorkProgramGeneralType} from "../../WorkProgram/types";
import {EducationalPlanType} from "../../EducationalPlan/types";
import {TrainingModuleType} from "../../EducationalPlan/TrainingModules/types";

export interface FolderActions{
    openAddFolderDialog: any;
    openAddToFolderDialog: any;
    closeDialog: any;
    getFolders: any;
    setFolders: any;
    createFolder: any;
    deleteFolder: any;
    addToFolder: any;
    removeFromFolder: any;
}

export interface foldersState{
    [fields.FOLDERS]: Array<FolderType>;
    [fields.ADD_TO_FOLDER_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean,
        [fields.DIALOG_DATA]: {}
    }
    [fields.ADD_FOLDER_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean,
        [fields.DIALOG_DATA]: {}
    }
}

export interface FoldersProps extends WithStyles<typeof styles>{
    folders: Array<FolderType>;
    actions: FolderActions;
}


export type FolderType = {
    [FoldersFields.ID]: number;
    [FoldersFields.DESCRIPTION]: string;
    [FoldersFields.NAME]: string;
    [FoldersFields.WORK_PROGRAM_IN_FOLDER]: Array<{
        [FoldersFields.WORK_PROGRAM]: WorkProgramGeneralType;
        [FoldersFields.WORK_PROGRAM_RATING]: string;
        [FoldersFields.COMMENT]: string;
        [FoldersFields.ID]: number;
    }>;
    [FoldersFields.ACADEMIC_PLAN_IN_FOLDER]: Array<{
        [FoldersFields.ACADEMIC_PLAN]: EducationalPlanType;
        [FoldersFields.ACADEMIC_PLAN_RATING]: string;
        [FoldersFields.COMMENT]: string;
        [FoldersFields.ID]: number;
    }>;
    [FoldersFields.BLOCK_MODULE_IN_FOLDER]: Array<{
        [FoldersFields.BLOCK_MODULE]: TrainingModuleType;
        [FoldersFields.BLOCK_MODULE_RATING]: string;
        [FoldersFields.COMMENT]: string;
        [FoldersFields.ID]: number;
    }>;
}