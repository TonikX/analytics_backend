import createReducer from "../../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {foldersState} from "./types";

export const GENERAL_PATH = 'folders';

export const initialState: foldersState = {
    [fields.FOLDERS]: []
};

const setFolders = (state: foldersState, {payload}: any): foldersState => ({
    ...state,
    [fields.FOLDERS]: payload,
});

export const reducer = createReducer(initialState, {
    [actions.setFolders.type]: setFolders,
});