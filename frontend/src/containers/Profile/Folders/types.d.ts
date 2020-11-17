import {WithStyles} from "@material-ui/core";
import {fields, FoldersFields} from './enum';
import styles from "./Folders.styles";

export interface FolderActions{
    openDialog: any;
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
}

export interface FoldersProps extends WithStyles<typeof styles>{
    folders: Array<FolderType>;
    actions: FolderActions;
}


export type FolderType = {
    [FoldersFields.ID]: number;
    [FoldersFields.DESCRIPTION]: string;
    [FoldersFields.NAME]: string;
}