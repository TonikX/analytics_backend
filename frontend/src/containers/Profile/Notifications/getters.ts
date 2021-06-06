import get from "lodash/get";
import {rootState} from "../../../store/reducers";

import {notificationsState} from "./types";
import {fields} from "./enum";
import {GENERAL_PATH} from './reducer';

const getStateData = (state: rootState): notificationsState => get(state, GENERAL_PATH);

export const getNotifications = (state: rootState) => get(getStateData(state), fields.NOTIFICATIONS, []);
