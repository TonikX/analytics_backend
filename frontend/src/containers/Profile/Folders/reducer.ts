import createReducer from "../../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {foldersState} from "./types";

export const GENERAL_PATH = 'folders';

export const initialState: foldersState = {
    [fields.FOLDERS]: [],
    [fields.ADD_TO_FOLDER_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    },
    [fields.ADD_FOLDER_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
};

const setFolders = (state: foldersState, {payload}: any): foldersState => ({
    ...state,
    [fields.FOLDERS]: payload,
});

const openAddToFolderDialog = (state: foldersState, {payload}: any): foldersState => ({
    ...state,
    [fields.ADD_TO_FOLDER_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});
const openAddFolderDialog = (state: foldersState, {payload}: any): foldersState => ({
    ...state,
    [fields.ADD_FOLDER_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});
const closeDialog = (state: foldersState): foldersState => ({
    ...state,
    [fields.ADD_TO_FOLDER_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    },
    [fields.ADD_FOLDER_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
});

export const reducer = createReducer(initialState, {
    [actions.setFolders.type]: setFolders,
    [actions.openAddToFolderDialog.type]: openAddToFolderDialog,
    [actions.openAddFolderDialog.type]: openAddFolderDialog,
    [actions.closeDialog.type]: closeDialog,
});
