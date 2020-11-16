import {FoldersFields} from './enum';

export interface FolderActions{
    getFolders: any;
    setFolders: any;
    createFolder: any;
    deleteFolder: any;
    addToFolder: any;
    removeFromFolder: any;
}

export interface foldersState{

}

export type FolderType = {
    [FoldersFields.ID]: number;
    [FoldersFields.DESCRIPTION]: string;
    [FoldersFields.NAME]: string;
}