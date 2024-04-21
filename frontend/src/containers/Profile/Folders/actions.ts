import {createAction} from "@reduxjs/toolkit";

import {FolderActions} from './types';

const getFolders = createAction('GET_FOLDERS');
const setFolders = createAction('SET_FOLDERS');
const createFolder = createAction('CREATE_FOLDER');
const deleteFolder = createAction('DELETE_FOLDER');
const addToFolder = createAction('ADD_TO_FOLDER');
const removeFromFolder = createAction('REMOVE_FROM_FOLDER');

const closeDialog = createAction('FOLDER_CLOSE_DIALOG');
const openAddToFolderDialog = createAction('FOLDER_OPEN_ADD_TO_FOLDER_DIALOG');
const openAddFolderDialog = createAction('FOLDER_OPEN_ADD_FOLDER_DIALOG');

const actions: FolderActions = {
    openAddFolderDialog,
    openAddToFolderDialog,
    closeDialog,
    getFolders,
    setFolders,
    createFolder,
    deleteFolder,
    addToFolder,
    removeFromFolder,
};

export default actions;
