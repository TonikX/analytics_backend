import get from "lodash/get";
import {rootState} from "../../../store/reducers";

import {foldersState} from "./types";
import {fields} from "./enum";
import {GENERAL_PATH} from './reducer';

const getStateData = (state: rootState): foldersState => get(state, GENERAL_PATH);

export const getFolders = (state: rootState) => get(getStateData(state), fields.FOLDERS, []);

export const getAddToFolderDialog = (state: rootState) => get(getStateData(state), fields.ADD_TO_FOLDER_DIALOG, {});
export const isOpenDialogAddToFolderDialog = (state: rootState) => get(getAddToFolderDialog(state), fields.IS_OPEN_DIALOG, false);
export const getAddToFolderDialogData = (state: rootState) => get(getAddToFolderDialog(state), fields.DIALOG_DATA, false);

export const getAddFolderDialog = (state: rootState) => get(getStateData(state), fields.ADD_FOLDER_DIALOG, {});
export const isOpenDialogFolderDialog = (state: rootState) => get(getAddFolderDialog(state), fields.IS_OPEN_DIALOG, false);
