import {createAction} from "@reduxjs/toolkit";

import {FolderActions} from './types';

const getFolders = createAction<string>('GET_FOLDERS');
const setFolders = createAction<string>('SET_FOLDERS');
const createFolder = createAction<string>('CREATE_FOLDER');
const deleteFolder = createAction<string>('DELETE_FOLDER');
const addToFolder = createAction<string>('ADD_TO_FOLDER');
const removeFromFolder = createAction<string>('REMOVE_FROM_FOLDER');

const actions: FolderActions = {
    getFolders,
    setFolders,
    createFolder,
    deleteFolder,
    addToFolder,
    removeFromFolder,
};

export default actions;