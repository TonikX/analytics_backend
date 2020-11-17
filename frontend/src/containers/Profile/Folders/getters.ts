import get from "lodash/get";
import {rootState} from "../../../store/reducers";

import {foldersState} from "./types";
import {fields} from "./enum";
import {GENERAL_PATH} from './reducer';

const getStateData = (state: rootState): foldersState => get(state, GENERAL_PATH);

export const getFolders = (state: rootState) => get(getStateData(state), fields.FOLDERS, []);
